package com.malikov.shopsystem.service;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository repository;

    @Override
    public Order save(Order order) {
        return repository.save(order);
    }

    @Override
    public Order update(Order order) {
        return repository.save(order);
    }

    @Override
    public Order get(int id) {
        return repository.get(id);
    }

    @Override
    public List<Order> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

    @Override
    public Collection<Order> getByCustomerId(int customerId) {
        return repository.getByCustomerId(customerId);
    }

    @Override
    public Collection<Order> getByProductId(int productId) {
        return repository.getByProductId(productId);
    }

    @Override
    public void updateStatus(Integer orderId, OrderStatus status) {
        repository.updateStatus(orderId, status);
    }

    @Override
    public List<Order> getDatatablePage(int start, int length) {
        return repository.getDatatablePage(start, length);
    }
}
