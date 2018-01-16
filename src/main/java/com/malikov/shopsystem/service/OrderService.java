package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.*;
import static java.util.Collections.singleton;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class OrderService {

    private static final Logger LOG = LoggerFactory.getLogger(OrderService.class);

    private static final Sort DESC_SORT_ORDER = new Sort(new Sort.Order(Sort.Direction.DESC, "id"));

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private UpdateStockService updateStockService;
    @Autowired
    private OrderMapper orderMapper;

    @SuppressWarnings("unchecked assignments")
    public Page<OrderDto> getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return convertToOrderDtoPage(orderRepository.findAll(buildFilterRestrictions(filter.getFilteringFields()),
                new PageRequest(filter.getPaging().getPage(), filter.getPaging().getSize(), DESC_SORT_ORDER)));
    }

    @SuppressWarnings("unchecked assignments")
    private Specifications buildFilterRestrictions(OrderFilterDto filter) {
        return emptySpecification()
                .and(orderOfCustomer(filter))
                .and(createdBetween(filter.getFromDateTimeCreated(), filter.getToDateTimeCreated()))
                .and(containsProduct(filter));
    }

    private Specification<Order> containsProduct(OrderFilterDto filter) {
        if (nonNull(filter.getProductVariationId())) {
            return orderContainsProductVariation(productVariationRepository.findOne(filter.getProductVariationId()));
        } else if (nonNull(filter.getProductId())) {
            return orderContainsProduct(productRepository.findOne(filter.getProductId()));
        } else if (nonNull(filter.getProductNameMask())) {
            return productNameLike(filter.getProductNameMask());
        }
        return null;
    }

    private Specifications orderOfCustomer(OrderFilterDto filter) {
        return nonNull(filter.getCustomerId())
                ? Specifications.where(customerIdEquals(filter.getCustomerId()))
                : emptySpecification()
                .and(customerFirstNameLike(filter.getCustomerFirstNameMask()))
                .and(customerLastNameLike(filter.getCustomerLastNameMask()))
                .and(customerDestinationCityLike(filter.getDestinationCityMask()))
                .and(customerPhoneLike(filter.getCustomerPhoneMask()));
    }

    private PageImpl<OrderDto> convertToOrderDtoPage(Page<Order> page) {
        return new PageImpl<>(
                page.getContent().stream()
                        .map(orderMapper::toDto)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

    public Order get(Long id) {
        return orderRepository.findOne(id);
    }

    @Transactional
    public void delete(Long id) {
        Order order = get(id);
        updateStockService.updateStockForDeletedOrder(order);
        orderRepository.delete(order);
    }

    @Transactional
    public Order createEmpty() {
        Order order = new Order();
        order.setUser(userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()));
        order.setPaymentType(PaymentType.NP);
        order.setStatus(OrderStatus.NEW);
        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(order);
        order.setOrderItems(new ArrayList<>(singleton(orderLine)));

        order.setStatusSortOrder(calcStatusSortOrder(OrderStatus.NEW));
        return orderRepository.save(order);
    }

    private Integer calcStatusSortOrder(OrderStatus status) {
        switch (status) {
            case OK:  return 5;
            case SHP: return 1;
            case WFP: return 2;
            case NEW: return 1;
            case NOT: return 4;
            default:  return 0;
        }
    }

    @Transactional
    public void update(OrderUpdateDto orderUpdateDto) {
        Order order = get(orderUpdateDto.getId());
        checkOrderNotFound(order, orderUpdateDto);

        setCustomerInfoToOrder(order, orderUpdateDto);
        setPaymentType(order, orderUpdateDto.getPaymentType());
        setNote(order, orderUpdateDto.getNote());
        setTotalSum(order, orderUpdateDto.getTotalSum());
        updateOrderStatus(order, orderUpdateDto.getStatus());
    }

    private void checkOrderNotFound(Order order, OrderUpdateDto orderUpdateDto) {
        if (isNull(order)) {
            throw new RuntimeException(String.format("order with id=%d not found", orderUpdateDto.getId()));
        }
    }

    private void updateOrderStatus(Order order, OrderStatus newStatus) {
        if (nonNull(newStatus)) {
            updateStockService.updateStockDependingOnNewStatus(order, newStatus);
            order.setStatus(newStatus);
            orderRepository.save(order);
        } else {
            orderRepository.save(order);
        }
    }

    private void setCustomerInfoToOrder(Order order, OrderUpdateDto orderUpdateDto) {
        if (nonNull(orderUpdateDto.getCustomerId())) {
            setCustomer(order, orderUpdateDto.getCustomerId());
        } else {
            setCustomerFirstName(order, orderUpdateDto.getCustomerFirstName());
            setCustomerLastName(order, orderUpdateDto.getCustomerLastName());
            setCustomerPhoneNumber(order, orderUpdateDto.getCustomerPhoneNumber());
            setDestinationCity(order, orderUpdateDto.getDestinationCity());
            setDestinationPostOffice(order, orderUpdateDto.getDestinationPostOffice());
        }
    }

    @Transactional
    public void setCustomer(Order order, Long customerId) {
        Customer customer = customerRepository.findOne(customerId);
        if (isNull(customer)) {
            throw new RuntimeException(String.format("Customer with id=%d not found", customerId));
        }
        order.setCustomerId(customer.getId());
        order.setCustomerFirstName(customer.getName());
        order.setCustomerLastName(customer.getLastName());
        order.setCustomerPhoneNumber(customer.getPhoneNumber());
        order.setDestinationCity(customer.getCity());
        order.setDestinationPostOffice(customer.getPostOffice());
    }

    private void setCustomerFirstName(Order order, String firstName) {
        if (nonNull(firstName)) {
            order.setCustomerFirstName(firstName);
        }
    }

    private void setCustomerLastName(Order order, String lastName) {
        if (nonNull(lastName)) {
            order.setCustomerLastName(lastName);
        }
    }

    private void setCustomerPhoneNumber(Order order, String phoneNumber) {
        if (nonNull(phoneNumber)) {
            order.setCustomerPhoneNumber(phoneNumber);
        }
    }

    private void setDestinationCity(Order order, String destinationCity) {
        if (nonNull(destinationCity)) {
            order.setDestinationCity(destinationCity);
        }
    }

    private void setDestinationPostOffice(Order order, String destinationPostOffice) {
        if (nonNull(destinationPostOffice)) {
            order.setDestinationPostOffice(destinationPostOffice);
        }
    }

    private void setPaymentType(Order order, PaymentType paymentType) {
        if (nonNull(paymentType)) {
            order.setPaymentType(paymentType);
        }
    }

    private void setNote(Order order, String comment) {
        if (nonNull(comment)) {
            order.setComment(comment);
        }
    }

    private void setTotalSum(Order order, BigDecimal totalSum) {
        if (nonNull(totalSum)) {
            order.setTotalValue(totalSum);
        }
    }

    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        return convertToOrderDtoPage(
                orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, DESC_SORT_ORDER)));
    }
}
