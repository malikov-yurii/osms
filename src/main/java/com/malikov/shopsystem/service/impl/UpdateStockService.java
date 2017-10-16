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

    public void updateStock(Order order, OrderStatus newStatus) {
        OrderStatus oldStatus = order.getStatus();
        if (newStatus.equals(oldStatus) || (isWithdrawalStatus(newStatus) == isWithdrawalStatus(oldStatus))) {
            return;
        }

        if (!isWithdrawalStatus(oldStatus) && isWithdrawalStatus(newStatus)) {
            updateProductQuantityInDbForAllOrderItems(order, DECREASE_STOCK);
        } else {
            updateProductQuantityInDbForAllOrderItems(order, INCREASE_STOCK);
        }
    }

    public void updateProductQuantityInDbForAllOrderItems(Order order, DbOperation dbOperation) {
        for (OrderItem orderItem : order.getOrderItems()) {
            if (isNull(orderItem.getProduct())) {
                continue;
            }

            if (nonNull(orderItem.getProductVariation())) {
                updateProductVariationStock(orderItem, dbOperation);
            } else {
                updateProductStock(orderItem, dbOperation);
            }
        }
    }

    public void updateStockForDeletedOrder(Order order) {
        if (isWithdrawalStatus(order.getStatus())) {
            updateProductQuantityInDbForAllOrderItems(order, INCREASE_STOCK);
        }
    }

    private void updateProductStock(OrderItem orderItem, DbOperation dbOperation) {
        Product product = orderItem.getProduct();
        int productQuantityToPersist = calculateNewStockQuantity(product.getQuantity(),
                orderItem.getProductQuantity(), dbOperation);
        product.setQuantity(productQuantityToPersist);
        productRepository.save(product);
    }

    private void updateProductVariationStock(OrderItem orderItem, DbOperation dbOperation) {
        ProductVariation productVariation = orderItem.getProductVariation();
        if (isNull(productVariation)) {
            return;
        }
        ProductAggregator productAggregator = productVariation.getProductAggregator();
        if (isNull(productAggregator)) {
            int productQuantityToPersist = calculateNewStockQuantity(productVariation.getQuantity(),
                    orderItem.getProductQuantity(), dbOperation);
            productVariation.setQuantity(productQuantityToPersist);
            productVariationRepository.save(productVariation);

        } else {
            int aggregatorQuantity = calculateAggregatorQuantity(productAggregator, productVariation.getQuantity(),
                    orderItem.getProductQuantity(), dbOperation);
            productAggregator.setQuantity(aggregatorQuantity);
            productAggregatorRepository.save(productAggregator);
        }
    }

    private int calculateAggregatorQuantity(ProductAggregator productAggregator, int productQuantityInDb,
                                            int productQuantityInOrderItem, DbOperation dbOperation) {
        int result;
        switch (productAggregator.getProductAggregatorType()) {
            case SIMPLE:
                result = calculateNewStockQuantity(productAggregator.getQuantity(),
                        productQuantityInOrderItem, dbOperation);
                break;
            case PG_GLUE:
                result = calculateNewStockAggregatorQuantityPG(productAggregator, productQuantityInDb,
                        productQuantityInOrderItem, dbOperation);
                break;
            default:
                throw new RuntimeException("only SIMPLE or PG_GLUE supported");
        }
        return result;
    }

    private int calculateNewStockAggregatorQuantityPG(ProductAggregator productAggregator, int productQuantityInDb,
                                                      int productQuantityInOrderItem, DbOperation dbOperation) {
        // TODO: 10/16/2017 implement pg quantity calculation
        return calculateNewStockQuantity(productQuantityInDb,
                productQuantityInOrderItem, dbOperation);
    }

    private int calculateNewStockQuantity(int productQuantityInDb, int productQuantityInOrderItem,
                                          DbOperation dbOperation) {
        int result;
        switch (dbOperation) {
            case INCREASE_STOCK:
                result = productQuantityInDb + productQuantityInOrderItem;
                break;
            case DECREASE_STOCK:
                result = productQuantityInDb - productQuantityInOrderItem;
                break;
            default:
                throw new RuntimeException("only INCREASE_STOCK or DECREASE_STOCK supported");
        }
        return result;
    }
}
