package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;

import java.util.Collection;
import java.util.List;

public interface OrderService {

    Order create();

    Order save(Order order);

    void update(Order order);

    Order get(Long id);

    void delete(Long id);

    Collection<Order> getByCustomerId(Long customerId);

    Collection<Order> getByProductId(Long productId);

    void updateStatus(Integer orderId, OrderStatus status);

    List<Order> getPage(int start, int length);

    Long getTotalQuantity();
}
