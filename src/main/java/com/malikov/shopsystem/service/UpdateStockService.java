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

import static com.malikov.shopsystem.enumtype.DbOperation.DECREASE_STOCK;
import static com.malikov.shopsystem.enumtype.DbOperation.INCREASE_STOCK;
import static com.malikov.shopsystem.util.OrderStatusUtil.isWithdrawalStatus;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

/**
 * @author Yurii Malikov
 */
@Service
public class UpdateStockService {

    public static final int PG_5_ID = 2;
    public static final int PG_7_ID = 8;
    public static final int PG_10_ID = 6;
    public static final int PG_14_ID = 5;
    public static final int PACKING_100_ML = 100;
    public static final int MILLIGRAMS_1500 = 1500;
    public static final int PACKING_500_ML = 500;
    public static final int MILLIGRAMS_7500 = 7500;
    public static final int PG_5_TRANSFORMATIONAL_COEFFICIENT = 1;
    public static final double PG_14_TRANSFORMATIONAL_COEFFICIENT = 0.55;
    public static final double PG_10_TRANSFORMATIONAL_COEFFICIENT = 0.66;
    public static final double PG_7_TRANSFORMATIONAL_COEFFICIENT = 0.95;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private ProductAggregatorRepository productAggregatorRepository;

    @Transactional
    public void updateStockDependingOnNewStatus(Order order, OrderStatus newStatus) {
        OrderStatus oldStatus = order.getStatus();
        if (newStatus.equals(oldStatus) || (isWithdrawalStatus(newStatus) == isWithdrawalStatus(oldStatus))) {
            return;
        }

        if (!isWithdrawalStatus(oldStatus) && isWithdrawalStatus(newStatus)) {
            updateStockForAllOrderItems(order, DECREASE_STOCK);
        } else {
            updateStockForAllOrderItems(order, INCREASE_STOCK);
        }
    }

    @Transactional
    public void updateStock(OrderLine orderLine, int orderItemQuantityDelta) {
        if (isWithdrawalStatus(orderLine.getOrder().getStatus())) {
            updateStockForOrderItem(orderLine, orderItemQuantityDelta);
        }
    }

    @Transactional
    public void updateStockForDeletedOrder(Order order) {
        if (isWithdrawalStatus(order.getStatus())) {
            updateStockForAllOrderItems(order, INCREASE_STOCK);
        }
    }

    private void updateStockForAllOrderItems(Order order, DbOperation dbOperation) {
        for (OrderLine orderLine : order.getOrderItems()) {
            if (isNull(orderLine.getProduct())) {
                continue;
            }
            updateStockForOrderItem(orderLine,
                    dbOperation == INCREASE_STOCK
                            ? orderLine.getProductQuantity()
                            : (-1) * orderLine.getProductQuantity());
        }
    }

    private void updateStockForOrderItem(OrderLine orderLine,
                                         Integer orderItemProductQuantityDelta) {
        if (nonNull(orderLine.getProductVariation())) {
            updateProductVariationStock(orderLine, orderItemProductQuantityDelta);
        } else if(nonNull(orderLine.getProduct())) {
            updateProductStock(orderLine, orderItemProductQuantityDelta);
        }
    }

    private void updateProductStock(OrderLine orderLine,
                                    Integer orderItemProductQuantityDelta) {
        Product product = orderLine.getProduct();
        int productQuantityToPersist = product.getQuantity() + orderItemProductQuantityDelta;
        product.setQuantity(productQuantityToPersist);
        productRepository.save(product);
    }

    private void updateProductVariationStock(OrderLine orderLine,
                                             Integer orderItemProductQuantityDelta) {
        ProductVariation productVariation = orderLine.getProductVariation();
        if (isNull(productVariation)) {
            return;
        }
        ProductAggregator productAggregator = productVariation.getProductAggregator();
        if (isNull(productAggregator)) {
            int productQuantityToPersist = productVariation.getQuantity() + orderItemProductQuantityDelta;
            productVariation.setQuantity(productQuantityToPersist);
            productVariationRepository.save(productVariation);
        } else {
            int aggregatorQuantity = calculateAggregatorQuantity(productAggregator, orderLine,
                    orderItemProductQuantityDelta);
            productAggregator.setQuantity(aggregatorQuantity);
            productAggregatorRepository.save(productAggregator);
        }
    }

    private int calculateAggregatorQuantity(ProductAggregator productAggregator, OrderLine orderLine,
                                            Integer orderItemQuantityDelta) {
        int result;
        switch (productAggregator.getProductAggregatorType()) {
            case SIMPLE:
                result = calculateStockSimpleAggregatorQuantity(productAggregator, orderLine, orderItemQuantityDelta);
                break;
            case PG_GLUE:
                result = calculateStockPG5AggregatorQuantity(productAggregator, orderLine, orderItemQuantityDelta);
                break;
            case WIRE:
                result = calculateStockWireAggregatorQuantity(productAggregator, orderLine, orderItemQuantityDelta);
                break;
            default:
                throw new RuntimeException("only SIMPLE or PG_GLUE supported");
        }
        return result;
    }

    private int calculateStockSimpleAggregatorQuantity(ProductAggregator productAggregator, OrderLine orderLine,
                                                       Integer orderItemQuantityDelta) {
        return productAggregator.getQuantity()
                + orderLine.getProductVariation().getVariationValue().getValueAmount() * orderItemQuantityDelta;
    }

    private int calculateStockPG5AggregatorQuantity(ProductAggregator productAggregator,
                                                    OrderLine orderLine,
                                                    Integer orderItemQuantityDelta) {
        return productAggregator.getQuantity() + calculatePG5AggregatorAmount(orderLine) * orderItemQuantityDelta;
    }

    private Integer calculatePG5AggregatorAmount(OrderLine orderLine) {
        Integer result = orderLine.getProductVariation().getVariationValue().getValueAmount();
        Product pgProduct = orderLine.getProduct();
        double pg5Coefficient;
        switch (pgProduct.getId().intValue()) {
            case PG_5_ID:
                pg5Coefficient = PG_5_TRANSFORMATIONAL_COEFFICIENT;
                break;
            case PG_14_ID:
                pg5Coefficient = PG_14_TRANSFORMATIONAL_COEFFICIENT;
                break;
            case PG_10_ID:
                pg5Coefficient = PG_10_TRANSFORMATIONAL_COEFFICIENT;
                break;
            case PG_7_ID:
                pg5Coefficient = PG_7_TRANSFORMATIONAL_COEFFICIENT;
                break;
            default:
                throw new RuntimeException("not suitable product for pg5 amount change aggregator stock calculation");
        }

        return (int) (result * pg5Coefficient);
    }

    private int calculateStockWireAggregatorQuantity(ProductAggregator productAggregator, OrderLine orderLine,
                                                     Integer orderItemQuantityDelta) {
        ProductVariation wireVariation = orderLine.getProductVariation();
        VariationValue wireVariationValue = wireVariation.getVariationValue();
        Integer wireInMilligrams;
        switch (wireVariationValue.getValueAmount()) {
            case PACKING_100_ML:
                wireInMilligrams = MILLIGRAMS_1500;
                break;
            case PACKING_500_ML:
                wireInMilligrams = MILLIGRAMS_7500;
                break;
            default:
                throw new RuntimeException("not suitable product for wire amount change aggregator stock calculation");
        }

        return productAggregator.getQuantity() + wireInMilligrams * orderItemQuantityDelta;
    }
}
