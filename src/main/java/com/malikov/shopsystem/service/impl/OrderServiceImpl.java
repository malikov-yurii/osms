package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.repository.*;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.util.OrderUtil;
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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.*;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger LOG = LoggerFactory.getLogger(OrderServiceImpl.class);

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

    @SuppressWarnings("unchecked assignments")
    public Page<OrderDto> getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return convertToOrderDtoPage(orderRepository.findAll(buildFilterRestrictions(filter.getFilteringFields()),
                new PageRequest(filter.getPaging().getPage(), filter.getPaging().getSize(), DESC_SORT_ORDER)));
    }

    @SuppressWarnings("unchecked assignments")
    private Specifications buildFilterRestrictions(OrderFilterDto filter) {
        return createSpecification()
                .and(addCustomerSpecifications(filter))
                .and(createdBetween(filter.getFromDateTimeCreated(), filter.getToDateTimeCreated()))
                .and(containProduct(filter));
    }

    private Specification<Order> containProduct(OrderFilterDto filter) {
        if (nonNull(filter.getProductVariationId())) {
            return orderContainsProductVariation(productVariationRepository.findOne(filter.getProductVariationId()));
        } else if (nonNull(filter.getProductId())) {
            return orderContainsProduct(productRepository.findOne(filter.getProductId()));
        } else if (nonNull(filter.getProductNameMask())) {
            return productNameLike(filter.getProductNameMask());
        }
        return Specifications.where(null);
    }

    private Specifications<Order> createSpecification() {
        return Specifications.where(null);
    }

    private Specifications addCustomerSpecifications(OrderFilterDto filter) {
        return nonNull(filter.getCustomerId())
                    ? Specifications.where(customerIdEquals(filter.getCustomerId()))
                    : createSpecification()
                            .and(customerFirstNameLike(filter.getCustomerFirstNameMask()))
                            .and(customerLastNameLike(filter.getCustomerLastNameMask()))
                            .and(customerDestinationCityLike(filter.getDestinationCityMask()))
                            .and(customerPhoneLike(filter.getCustomerPhoneMask()));
    }

    private PageImpl<OrderDto> convertToOrderDtoPage(Page<Order> page) {
        return new PageImpl<>(
                page.getContent().stream()
                        .map(OrderUtil::asTo)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

    @Override
    public Order get(Long id) {
        return orderRepository.findOne(id);
    }

    @Override
    public void delete(Long id) {
        Order order = get(id);
        updateStockService.updateStockForDeletedOrder(order);
        orderRepository.delete(order);
    }

    @Override
    public Order save(OrderDto orderDto) {
        throw new RuntimeException("save new order method not implemented");
    }

    @Override
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

    @Transactional(propagation = Propagation.MANDATORY)
    public void setCustomer(Order order, Long customerId) {
        Customer customer = customerRepository.findOne(customerId);
        if (isNull(customer)) {
            throw new RuntimeException(String.format("Customer with id=%d not found", customerId));
        }
        order.setCustomer(customer);
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

    @Override
    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        return convertToOrderDtoPage(
                orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, DESC_SORT_ORDER)));
    }

    @Override
    public Order createEmpty() {
        Order newOrder = new Order(null,
                userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                PaymentType.NP, OrderStatus.NEW, null, Collections.singletonList(new OrderLine()));
        LOG.info("create new {}", newOrder);
        return orderRepository.save(newOrder);
    }
}
