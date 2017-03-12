package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;

import java.util.Collection;
import java.util.List;

public interface OrderService extends Service<Order> {

    Collection<Order> getByCustomerId(int customerId);

    Collection<Order> getByProductId(int productId);

    void updateStatus(Integer orderId, OrderStatus status);

    List<Order> getDatatablePage(int start, int length);

    Long getTotalQuantity();
}
