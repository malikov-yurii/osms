package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;

import java.util.Collection;
import java.util.List;

public interface OrderRepository extends Repository<Order> {

    Collection<Order> getByCustomerId(Long customerId);

    Collection<Order> getByProductId(Long productId);

    void updateStatus(Integer orderId, OrderStatus status);

    List<Order> getDatatablePage(int start, int length);

    Long getTotalQuantity();

}
