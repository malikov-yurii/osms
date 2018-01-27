package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.filter.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderPage;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.mapper.OrderUpdateByNotNullFieldsMapper;
import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.containsProduct;
import static com.malikov.shopsystem.repository.specification.OrderSpecification.createdBetween;
import static com.malikov.shopsystem.repository.specification.OrderSpecification.emptySpecification;
import static com.malikov.shopsystem.repository.specification.OrderSpecification.orderOfCustomer;
import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;
import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;

@Service
public class OrderService {

    private static final Sort DESC_ID = new Sort(new Sort.Order(Sort.Direction.DESC, "id"));

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private UpdateStockService updateStockService;
    @Autowired
    private OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper;
    @Autowired
    private OrderMapper orderMapper;

    @SuppressWarnings("unchecked assignments")
    public OrderPage getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {

        return orderMapper.toPage(orderRepository.findAll(buildFilterRestrictions(filter.getFilteringFields()),
                new PageRequest(filter.getPaging().getPage(), filter.getPaging().getSize(), DESC_ID)));
    }

    @SuppressWarnings("unchecked assignments")
    private Specifications buildFilterRestrictions(OrderFilterDto filter) {

        return emptySpecification()
                .and(orderOfCustomer(filter))
                .and(createdBetween(filter.getFromDateTimeCreated(), filter.getToDateTimeCreated()))
                .and(containsProduct(filter));
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
        order.setStatusSortOrder(calcStatusSortOrder(OrderStatus.NEW));

        return orderMapper.toDto(orderRepository.save(order));
    }

    private Integer calcStatusSortOrder(OrderStatus status) {

        switch (status) {
            case OK:
                return 5;
            case SHP:
                return 1;
            case WFP:
                return 2;
            case NEW:
                return 1;
            case NOT:
                return 4;
            default:
                return 0;
        }
    }

    @Transactional
    public void update(OrderUpdateDto orderUpdateDto) {

        Order order = checkNotFoundById(orderRepository.findOne(orderUpdateDto.getId()), orderUpdateDto.getId());

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
        Customer customer = checkNotFoundById(customerRepository.findOne(customerId), customerId);
        orderMapper.updateByCustomer(customer, order);
    }

    public OrderPage getPage(int pageNumber, int pageCapacity) {
        return orderMapper.toPage(orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, DESC_ID)));
    }

}
