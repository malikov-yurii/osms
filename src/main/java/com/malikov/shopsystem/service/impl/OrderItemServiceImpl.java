package com.malikov.shopsystem.service.impl;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.repository.OrderItemRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public void update(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    @Override
    public void updateProductName(Long id, String newProductName) {
        OrderItem orderItem = orderItemRepository.get(id);
        orderItem.setProductName(newProductName);
        orderItemRepository.save(orderItem);
    }

    @Override
    public int updateOrderItemProductQuantity(Long itemId, int quantity) {
            OrderItem orderItem = orderItemRepository.get(itemId);
            orderItem.setProductQuantity(quantity);
        return recalculateTotalSum(orderItem);
    }

    private int recalculateTotalSum(OrderItem orderItem) {
        Order order = orderItem.getOrder();
        int totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderRepository.save(order);
        orderItemRepository.save(orderItem);
        return totalSum;
    }

    @Override
    public int updateOrderItemProductPrice(Long itemId, int price) {
            OrderItem orderItem = orderItemRepository.get(itemId);
            orderItem.setProductPrice(price);
        return recalculateTotalSum(orderItem);
    }

    @Override
    public OrderItem get(Long id) {
        return orderItemRepository.get(id);
    }

    @Override
    public void delete(Long id) {
        orderItemRepository.delete(id);
    }

}
