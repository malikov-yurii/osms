package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;

import java.util.Collection;
import java.util.List;

public interface OrderRepository extends Repository<Order> {

    /**
     * @return orders found by customerId or emply list if not found any
     */
    Collection<Order> getByCustomerId(Long customerId);

    /**
     * @return orders found by productId or emply list if not found any
     */
    Collection<Order> getByProductId(Long productId);

    void updateStatus(Long orderId, OrderStatus status);

    List<Order> getDatatablePage(int start, int length);

    Long getTotalQuantity();
}
