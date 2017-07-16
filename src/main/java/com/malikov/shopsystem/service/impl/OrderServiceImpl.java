package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.UserRepository;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger LOG = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void update(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Order get(Long id) {
        return orderRepository.findOne(id);
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
    public void updateStatus(Long orderId, OrderStatus status) {
        orderRepository.updateStatus(orderId, status);
    }

    @Override
    @Transactional
    public void updateComment(Long orderId, String comment) {
        Order order = get(orderId);
        order.setComment(comment);
        save(order);
    }

    @Override
    @Transactional
    public void updatePaymentType(Long orderId, PaymentType paymentType) {
        Order order = get(orderId);
        order.setPaymentType(paymentType);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerFirstName(Long orderId, String firstName) {
        Order order = get(orderId);
        order.setCustomerName(firstName);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerLastName(Long orderId, String lastName) {
        Order order = get(orderId);
        order.setCustomerLastName(lastName);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerPhoneNumber(Long orderId, String phoneNumber) {
        Order order = get(orderId);
        order.setCustomerPhoneNumber(phoneNumber);
        save(order);
    }

    @Override
    @Transactional
    public void updateCity(Long orderId, String cityName) {
        Order order = get(orderId);
        order.setCustomerCity(cityName);
        save(order);
    }

    @Override
    @Transactional
    public void updatePostOffice(Long orderId, String postOffice) {
        Order order = get(orderId);
        order.setCustomerPostOffice(postOffice);
        save(order);
    }

    @Override
    @Transactional
    public void updateTotalSum(Long orderId, BigDecimal totalSum) {
        Order order = get(orderId);
        order.setTotalSum(totalSum);
        save(order);
    }

    @Override
    @Transactional
    public void setCustomer(Long orderId, Long customerId) {
        Order order = get(orderId);
        order.setCustomer(customerRepository.findOne(customerId));
        save(order);
    }

    @Override
    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        Page<Order> page = orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, new Sort(
                new Sort.Order(Sort.Direction.DESC, "id")
        )));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(OrderUtil::asTo)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

    /*@Override
    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        Page<Order> page = orderRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(OrderUtil::asTo)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }
*/
    @Override
    public Long getTotalQuantity() {
        return orderRepository.count();
    }

    @Override
    public Order create() {
        Order newOrder = new Order(null,
                userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                PaymentType.NP, OrderStatus.SHP, null, Collections.singletonList(new OrderItem()));
        LOG.info("create new {}", newOrder);
        return save(newOrder);
    }
}
