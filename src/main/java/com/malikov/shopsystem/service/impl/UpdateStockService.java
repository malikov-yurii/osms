package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.enumtype.DbOperation;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.model.*;
import com.malikov.shopsystem.repository.ProductAggregatorRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private ProductAggregatorRepository productAggregatorRepository;

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

    public void updateStock(OrderItem orderItem, int orderItemQuantityDelta) {
        if (isWithdrawalStatus(orderItem.getOrder().getStatus())) {
            updateStockForOrderItem(orderItem, orderItemQuantityDelta);
        }
    }

    public void updateStockForDeletedOrder(Order order) {
        if (isWithdrawalStatus(order.getStatus())) {
            updateStockForAllOrderItems(order, INCREASE_STOCK);
        }
    }

    private void updateStockForAllOrderItems(Order order, DbOperation dbOperation) {
        for (OrderItem orderItem : order.getOrderItems()) {
            if (isNull(orderItem.getProduct())) {
                continue;
            }
            updateStockForOrderItem(orderItem,
                    dbOperation == INCREASE_STOCK
                            ? orderItem.getProductQuantity()
                            : (-1) * orderItem.getProductQuantity());
        }
    }

    private void updateStockForOrderItem(OrderItem orderItem,
                                         Integer orderItemProductQuantityDelta) {
        if (nonNull(orderItem.getProductVariation())) {
            updateProductVariationStock(orderItem, orderItemProductQuantityDelta);
        } else if(nonNull(orderItem.getProduct())) {
            updateProductStock(orderItem, orderItemProductQuantityDelta);
        }
    }

    private void updateProductStock(OrderItem orderItem,
                                    Integer orderItemProductQuantityDelta) {
        Product product = orderItem.getProduct();
        int productQuantityToPersist = product.getQuantity() + orderItemProductQuantityDelta;
        product.setQuantity(productQuantityToPersist);
        productRepository.save(product);
    }

    private void updateProductVariationStock(OrderItem orderItem,
                                             Integer orderItemProductQuantityDelta) {
        ProductVariation productVariation = orderItem.getProductVariation();
        if (isNull(productVariation)) {
            return;
        }
        ProductAggregator productAggregator = productVariation.getProductAggregator();
        if (isNull(productAggregator)) {
            int productQuantityToPersist = productVariation.getQuantity() + orderItemProductQuantityDelta;
            productVariation.setQuantity(productQuantityToPersist);
            productVariationRepository.save(productVariation);
        } else {
            int aggregatorQuantity = calculateAggregatorQuantity(productAggregator, orderItem,
                    orderItemProductQuantityDelta);
            productAggregator.setQuantity(aggregatorQuantity);
            productAggregatorRepository.save(productAggregator);
        }
    }

    private int calculateAggregatorQuantity(ProductAggregator productAggregator, OrderItem orderItem,
                                            Integer orderItemQuantityDelta) {
        int result;
        switch (productAggregator.getProductAggregatorType()) {
            case SIMPLE:
                result = productAggregator.getQuantity() + orderItem.getProductVariation().getVariationValue().getValueAmount() * orderItemQuantityDelta;
                break;
            case PG_GLUE:
                // TODO: 10/16/2017 implement pg quantity calculation
                result = productAggregator.getQuantity() + orderItem.getProductVariation().getVariationValue().getValueAmount() * orderItemQuantityDelta;
                break;
            default:
                throw new RuntimeException("only SIMPLE or PG_GLUE supported");
        }
        return result;
    }

    private int calculateNewStockAggregatorQuantityPG(ProductAggregator productAggregator,
                                                      OrderItem orderItem) {
        // TODO: 10/16/2017 implement pg quantity calculation
        return productAggregator.getQuantity() + orderItem.getProductVariation().getVariationValue().getValueAmount() * orderItem.getProductQuantity();
    }

}
