package com.malikov.shopsystem.service;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    OrderItemRepository repository;

    @Override
    public OrderItem save(OrderItem orderItem) {
        return repository.save(orderItem);
    }

    @Override
    public OrderItem update(OrderItem orderItem) {
        return repository.save(orderItem);
    }

    @Override
    public OrderItem get(int id) {
        return repository.get(id);
    }

    @Override
    public List<OrderItem> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

}
