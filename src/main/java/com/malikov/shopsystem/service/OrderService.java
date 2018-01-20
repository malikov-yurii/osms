package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.mapper.OrderUpdateByNotNullFieldsMapper;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.repository.*;
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

import java.util.ArrayList;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.*;
import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;
import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;

@Service
public class OrderService {

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
    private OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper;
    @Autowired
    private OrderMapper orderMapper;

    @SuppressWarnings("unchecked assignments")
    public Page<OrderDto> getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {

        return toOrderDtoPage(orderRepository.findAll(buildFilterRestrictions(filter.getFilteringFields()),
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

    private PageImpl<OrderDto> toOrderDtoPage(Page<Order> page) {
        return new PageImpl<>(orderMapper.toDto(page.getContent()), null, page.getTotalElements());
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
    public Order create() {

        Order order = new Order();
        order.setUser(userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()));
        order.setPaymentType(PaymentType.NP);
        order.setStatus(OrderStatus.NEW);
        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(order);
        order.setOrderLines(new ArrayList<>(singleton(orderLine)));
        order.setStatusSortOrder(calcStatusSortOrder(OrderStatus.NEW));

        return orderRepository.save(order);
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

        Order order = checkNotFoundById(get(orderUpdateDto.getId()), orderUpdateDto.getId());

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

    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        return toOrderDtoPage(orderRepository.findAll(new PageRequest(pageNumber, pageCapacity, DESC_SORT_ORDER)));
    }

}
