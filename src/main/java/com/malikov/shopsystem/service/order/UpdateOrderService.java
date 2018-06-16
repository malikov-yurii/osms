package com.malikov.shopsystem.service.order;

import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.error.exception.NotFoundException;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.mapper.UpdateOrderByNotNullFieldsMapper;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.UpdateStockService;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class UpdateOrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UpdateOrderByNotNullFieldsMapper updateOrderByNotNullFieldsMapper;
    private final CustomerRepository customerRepository;
    private final UpdateStockService updateStockService;

    public UpdateOrderService(OrderRepository orderRepository,
                              OrderMapper orderMapper,
                              UpdateOrderByNotNullFieldsMapper updateOrderByNotNullFieldsMapper,
                              CustomerRepository customerRepository,
                              UpdateStockService updateStockService) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.updateOrderByNotNullFieldsMapper = updateOrderByNotNullFieldsMapper;
        this.customerRepository = customerRepository;
        this.updateStockService = updateStockService;
    }

    @Transactional
    @CachePut(key = "#orderDto.orderId")
    public OrderDto update(OrderDto orderDto) {
        Long orderId = orderDto.getOrderId();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException(Order.class, orderId));

        setCustomerInfoToOrder(order, orderDto);
        updateOrderByNotNullFieldsMapper.updateByNonCustomerRelatedInfo(orderDto, order);
        updateOrderStatus(orderDto.getStatus(), order);

        return orderMapper.toDto(orderRepository.save(order));
    }

    private void updateOrderStatus(OrderStatus newStatus, Order order) {
        if (Objects.nonNull(newStatus)) {
            updateStockService.updateStockDependingOnNewStatus(order, newStatus);
            order.setStatus(newStatus);
        }
    }

    private void setCustomerInfoToOrder(Order order, OrderDto orderDto) {
        if (Objects.nonNull(orderDto.getCustomerId())) {
            changeOrderCustomer(orderDto.getCustomerId(), order);
        } else {
            updateOrderByNotNullFieldsMapper.updateByCustomerRelatedInfo(orderDto, order);
        }
    }

    private void changeOrderCustomer(Long customerId, Order order) {
        orderMapper.updateByCustomer(getCustomer(customerId), order);
    }

    private Customer getCustomer(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

}
