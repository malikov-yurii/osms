package com.malikov.shopsystem.service;

import com.malikov.shopsystem.enumtype.DbOperation;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.model.*;
import com.malikov.shopsystem.repository.ProductAggregatorRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.malikov.shopsystem.enumtype.DbOperation.DECREASE_STOCK;
import static com.malikov.shopsystem.enumtype.DbOperation.INCREASE_STOCK;
import static com.malikov.shopsystem.enumtype.OrderStatus.*;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.Optional.ofNullable;

/**
 * @author Yurii Malikov
 */
@Service
public class UpdateStockService {

    public static final Map<Integer, Integer> WIRE_PACKAGE_TYPE_WEIGHT_IN_MILLIGRAMS =
            new HashMap<Integer, Integer>() {{
                put(PACKING_100_ML, MILLIGRAMS_1500);
                put(PACKING_500_ML, MILLIGRAMS_7500);
            }};

    public static final Map<Integer, Double> PG_PRODUCT_ID_TRANSFORMATIONAL_COEFFICIENT =
            new HashMap<Integer, Double>() {{
                put(PG_5_ID, 1d);
                put(PG_7_ID, 0.95);
                put(PG_10_ID, 0.66);
                put(PG_14_ID, 0.55);
            }};

    public static final Set<OrderStatus> WITHDRAWAL_STATUSES = new HashSet<>(Arrays.asList(OK, SHP, WFP));
    public static final int PG_5_ID = 2;
    public static final int PG_7_ID = 8;
    public static final int PG_10_ID = 6;
    public static final int PG_14_ID = 5;
    public static final int PACKING_100_ML = 100;
    public static final int MILLIGRAMS_1500 = 1500;
    public static final int PACKING_500_ML = 500;
    public static final int MILLIGRAMS_7500 = 7500;
    public static final int DECREASE = -1;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private ProductAggregatorRepository productAggregatorRepository;

    @Transactional
    public void updateStockDependingOnNewStatus(Order order, OrderStatus newStatus) {

        OrderStatus oldStatus = order.getStatus();
        if (stockShouldBeUpdated(newStatus, oldStatus)) {
            updateStock(order, newStatus, oldStatus);
        }
    }

    private boolean stockShouldBeUpdated(OrderStatus newStatus, OrderStatus oldStatus) {
        return !(newStatus.equals(oldStatus) || (isWithdrawalStatus(newStatus) == isWithdrawalStatus(oldStatus)));
    }

    private boolean isWithdrawalStatus(OrderStatus status) {
        return WITHDRAWAL_STATUSES.contains(status);
    }

    private void updateStock(Order order, OrderStatus newStatus, OrderStatus oldStatus) {

        if (stockShouldBeDecreased(newStatus, oldStatus)) {
            updateAllProductsBoundedToOrderLinesStock(order, DECREASE_STOCK);
        } else {
            updateAllProductsBoundedToOrderLinesStock(order, INCREASE_STOCK);
        }
    }

    private boolean stockShouldBeDecreased(OrderStatus newStatus, OrderStatus oldStatus) {
        return isNotWithdrawalStatus(oldStatus) && isWithdrawalStatus(newStatus);
    }

    private boolean isNotWithdrawalStatus(OrderStatus status) {
        return !isWithdrawalStatus(status);
    }

    private void updateAllProductsBoundedToOrderLinesStock(Order order, DbOperation dbOperation) {

        for (OrderLine orderLine : order.getOrderLines()) {
            if (noProductIsBoundToOrderLine(orderLine)) {
                continue;
            }
            updaterProductBoundedToOrderLineStock(orderLine, productQuantityDelta(dbOperation, orderLine));
        }
    }

    private boolean noProductIsBoundToOrderLine(OrderLine orderLine) {
        return isNull(orderLine.getProduct());
    }

    private int productQuantityDelta(DbOperation dbOperation, OrderLine orderLine) {
        return dbOperation == INCREASE_STOCK ? orderLine.getProductQuantity() : (-1) * orderLine.getProductQuantity();
    }

    private void updaterProductBoundedToOrderLineStock(OrderLine orderLine, Integer productQuantityDelta) {

        if (nonNull(orderLine.getProductVariation())) {
            updateProductVariationStock(orderLine, productQuantityDelta);
        } else if (nonNull(orderLine.getProduct())) {
            updateProductStock(orderLine, productQuantityDelta);
        }
    }

    private void updateProductVariationStock(OrderLine orderLine, Integer productQuantityDelta) {

        ProductVariation productVariation = orderLine.getProductVariation();

        if (isNull(productVariation.getProductAggregator())) {
            updateNotAggregatedProductVariationStock(productQuantityDelta, productVariation);
        } else {
            updateProductAggregatorStock(productQuantityDelta, orderLine);
        }
    }

    private void updateNotAggregatedProductVariationStock(Integer productQuantityDelta,
                                                          ProductVariation productVariation) {

        productVariation.setQuantity(productVariation.getQuantity() + productQuantityDelta);
        productVariationRepository.save(productVariation);
    }

    private void updateProductAggregatorStock(Integer productQuantityDelta, OrderLine orderLine) {

        ProductAggregator aggregator = orderLine.getProductVariation().getProductAggregator();
        aggregator.setQuantity(calcAggregatorStock(orderLine, productQuantityDelta));
        productAggregatorRepository.save(aggregator);
    }

    private int calcAggregatorStock(OrderLine orderLine, Integer productQuantityDelta) {

        switch (orderLine.getProductVariation().getProductAggregator().getProductAggregatorType()) {
            case SIMPLE:
                return calcSimpleAggregatorStock(orderLine, productQuantityDelta);
            case PG_GLUE:
                return calcPG5AggregatorStock(orderLine, productQuantityDelta);
            case WIRE:
                return calcWireAggregatorStock(orderLine, productQuantityDelta);
            default:
                throw new RuntimeException("Only SIMPLE, PG_GLUE, WIRE aggregator types supported.");
        }
    }

    private int calcPG5AggregatorStock(OrderLine orderLine, Integer productQuantityDelta) {

        return orderLine.getProductVariation().getProductAggregator().getQuantity()
                + calcPG5AggregatorDelta(orderLine) * productQuantityDelta;
    }

    private Integer calcPG5AggregatorDelta(OrderLine orderLine) {

        Integer result = orderLine.getProductVariation().getVariationValue().getValueAmount();
        Product pgProduct = orderLine.getProduct();
        double pg5Coefficient = pg5Coefficient(pgProduct);

        return (int) (result * pg5Coefficient);
    }

    private double pg5Coefficient(Product pgProduct) {
        return ofNullable(PG_PRODUCT_ID_TRANSFORMATIONAL_COEFFICIENT.get(pgProduct.getId().intValue()))
                .orElseThrow(() -> new RuntimeException("PG stock update failed. " +
                        "I told you to get rid of linking business logic to ID's, you dummy!"));
    }

    private int calcWireAggregatorStock(OrderLine orderLine, Integer productQuantityDelta) {

        ProductVariation productVariation = orderLine.getProductVariation();
        Integer wirePackageType = productVariation.getVariationValue().getValueAmount();
        Integer wireInMilligrams = ofNullable(WIRE_PACKAGE_TYPE_WEIGHT_IN_MILLIGRAMS.get(wirePackageType))
                .orElseThrow(() -> new RuntimeException("Wire stock update failed. Not found provided wire type."));

        return productVariation.getProductAggregator().getQuantity() + wireInMilligrams * productQuantityDelta;
    }

    private int calcSimpleAggregatorStock(OrderLine orderLine, Integer productQuantityDelta) {

        ProductVariation productVariation = orderLine.getProductVariation();
        ProductAggregator aggregator = productVariation.getProductAggregator();

        return aggregator.getQuantity() + productVariation.getVariationValue().getValueAmount() * productQuantityDelta;
    }

    private void updateProductStock(OrderLine orderLine, Integer productQuantityDelta) {

        Product product = orderLine.getProduct();
        product.setQuantity(product.getQuantity() + productQuantityDelta);
        productRepository.save(product);
    }

    @Transactional
    public void updateStock(OrderLine orderLine, int productQuantityDelta) {

        if (isWithdrawalStatus(orderLine.getOrder().getStatus())) {
            updaterProductBoundedToOrderLineStock(orderLine, productQuantityDelta);
        }
    }

    @Transactional
    public void returnToStock(OrderLine orderLine) {
        updateStock(orderLine, orderLine.getProductQuantity());
    }

    @Transactional
    public void updateStockForDeletedOrder(Order order) {

        if (isWithdrawalStatus(order.getStatus())) {
            updateAllProductsBoundedToOrderLinesStock(order, INCREASE_STOCK);
        }
    }

    public void decreaseStock(OrderLine orderLine, Integer stock) {
        updateStock(orderLine, DECREASE * stock);
    }

}
