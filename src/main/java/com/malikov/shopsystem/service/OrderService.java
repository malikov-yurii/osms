package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderPage;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.dto.Paging;
import com.malikov.shopsystem.dto.filter.GenericFilter;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.mapper.OrderUpdateByNotNullFieldsMapper;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.filteringBy;
import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;

@Service
public class OrderService {

    private static final Sort DESC_ID = new Sort(new Sort.Order(Sort.Direction.DESC, "id"));

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final UpdateStockService updateStockService;
    private final OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper;
    private final OrderMapper orderMapper;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository,
                        CustomerRepository customerRepository, UpdateStockService updateStockService,
                        OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.updateStockService = updateStockService;
        this.orderUpdateByNotNullFieldsMapper = orderUpdateByNotNullFieldsMapper;
        this.orderMapper = orderMapper;
    }

    public OrderPage getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return orderMapper.toPage(getOrderPageFilteredBy(filter));
    }

    private Page getOrderPageFilteredBy(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return orderRepository.findAll(filteringBy(filter.getFilteringFields()), pageRequest(filter.getPaging()));
    }

    private PageRequest pageRequest(Paging paging) {
        return new PageRequest(paging.getPage(), paging.getSize(), DESC_ID);
    }

    public OrderDto get(Long id) {
        return orderMapper.toDto(orderRepository.findOne(id));
    }

    @Transactional
    public void delete(Long id) {
        Order order = orderRepository.findOne(id);
        updateStockService.updateStockForDeletedOrder(order);
        orderRepository.delete(order);
    }

    @Transactional
    public OrderDto create() {

        Order order = new Order();
        order.setUser(userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()));
        order.setPaymentType(PaymentType.NP);
        order.setStatus(OrderStatus.NEW);
        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(order);
        order.setOrderLines(new ArrayList<>(singleton(orderLine)));

        return orderMapper.toDto(orderRepository.save(order));
    }

    @Transactional
    public void update(OrderUpdateDto orderUpdateDto) {

        Order order = orderRepository.findOne(orderUpdateDto.getOrderId());

        setCustomerInfoToOrder(order, orderUpdateDto);
        orderUpdateByNotNullFieldsMapper.updateByNonCustomerRelatedInfo(orderUpdateDto, order);
        updateOrderStatus(orderUpdateDto.getStatus(), order);

        orderRepository.save(order);
    }

    private void updateOrderStatus(OrderStatus newStatus, Order order) {
        if (nonNull(newStatus)) {
            updateStockService.updateStockDependingOnNewStatus(order, newStatus);
            order.setStatus(newStatus);
        }
    }

    private void setCustomerInfoToOrder(Order order, OrderUpdateDto orderUpdateDto) {
        if (nonNull(orderUpdateDto.getCustomerId())) {
            changeOrderCustomer(orderUpdateDto.getCustomerId(), order);
        } else {
            orderUpdateByNotNullFieldsMapper.updateByCustomerRelatedInfo(orderUpdateDto, order);
        }
    }

    @Transactional
    public void changeOrderCustomer(Long customerId, Order order) {
        orderMapper.updateByCustomer(customerRepository.findOne(customerId), order);
    }

    public OrderPage getPage(int pageNumber, int pageCapacity) {
        return orderMapper.toPage(orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, DESC_ID)));
    }

}
