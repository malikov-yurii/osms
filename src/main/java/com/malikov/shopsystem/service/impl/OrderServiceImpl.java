package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger LOG = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserService userService;

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order get(Long id) {
        return orderRepository.get(id);
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    @Override
    public void delete(Long id) {
        orderRepository.delete(id);
    }

    @Override
    public Collection<Order> getByCustomerId(Long customerId) {
        return orderRepository.getByCustomerId(customerId);
    }

    @Override
    public Collection<Order> getByProductId(Long productId) {
        return orderRepository.getByProductId(productId);
    }

    @Override
    public void updateStatus(Integer orderId, OrderStatus status) {
        orderRepository.updateStatus(orderId, status);
    }

    @Override
    public List<Order> getDatatablePage(int start, int length) {
        return orderRepository.getDatatablePage(start, length);
    }

    @Override
    public Long getTotalQuantity() {
        return orderRepository.getTotalQuantity();
    }

    @Override
    public Order create() {
        Order newOrder = new Order(null,
                userService.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                PaymentType.NP, OrderStatus.SHP, null, Collections.singletonList(new OrderItem()));
        LOG.info("create new {}", newOrder);
        return save(newOrder);
    }
}
