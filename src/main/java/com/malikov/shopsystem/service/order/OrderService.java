package com.malikov.shopsystem.service.order;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderPage;
import com.malikov.shopsystem.dto.Paging;
import com.malikov.shopsystem.dto.filter.GenericFilter;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.error.exception.NotFoundException;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.specification.OrderSpecification;
import com.malikov.shopsystem.service.UpdateStockService;
import com.malikov.shopsystem.service.order.cache.GetCachedOrdersPageService;
import com.malikov.shopsystem.service.order.cache.TotalOrderQuantityHolder;
import com.malikov.shopsystem.service.security.AuthorizedUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Slf4j
@CacheConfig(cacheNames = OrderService.LAST_ORDERS_CACHE)
public class OrderService {

    public static final String LAST_ORDERS_CACHE = "lastOrders";
    private static final Sort DESC_ID = Sort.by(new Sort.Order(Sort.Direction.DESC, "id"));

    private final OrderRepository orderRepository;
    private final AuthorizedUserService authorizedUserService;
    private final UpdateStockService updateStockService;
    private final OrderMapper orderMapper;
    private final GetCachedOrdersPageService getCachedOrderPageService;

    public OrderService(OrderRepository orderRepository,
                        AuthorizedUserService authorizedUserService,
                        UpdateStockService updateStockService,
                        OrderMapper orderMapper,
                        GetCachedOrdersPageService getCachedOrderPageService) {
        this.orderRepository = orderRepository;
        this.authorizedUserService = authorizedUserService;
        this.updateStockService = updateStockService;
        this.orderMapper = orderMapper;
        this.getCachedOrderPageService = getCachedOrderPageService;
    }

    @Cacheable(key = "#orderId", unless = "true")
    public OrderDto get(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException(Order.class, orderId));
        return orderMapper.toDto(order);
    }

    public OrderPage getPage(int pageNumber, int pageCapacity) {
        return getCachedOrderPageService.isPageInLastOrdersCache(pageNumber, pageCapacity)
                ? getCachedOrderPageService.getCachedOrdersPage(pageNumber, pageCapacity)
                : orderMapper.toOrderPage(findPage(pageNumber, pageCapacity));
    }

    private Page<Order> findPage(int pageNumber, int pageCapacity) {
        return orderRepository.findAll(pageRequest(pageNumber, pageCapacity));
    }

    private static PageRequest pageRequest(int pageNumber, int pageCapacity) {
        return PageRequest.of(pageNumber, pageCapacity, DESC_ID);
    }

    public OrderPage getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return orderMapper.toOrderPage(findOrderPageFilteringBy(filter));
    }

    private Page findOrderPageFilteringBy(GenericFilter<OrderFilterDto, OrderDto> filter) {
        PageRequest pageRequest = pageRequest(filter.getPaging());
        Specifications filteringSpecification = OrderSpecification.of(filter.getFilteringFields());
        return orderRepository.findAll(filteringSpecification, pageRequest);
    }

    private static PageRequest pageRequest(Paging paging) {
        return pageRequest(paging.getPageNumber(), paging.getPageSize());
    }

    @Transactional
    @CachePut(key = "#result.orderId")
    public OrderDto createEmpty() {
        Order emptyOrder = prepareEmptyOrder();
        Order savedOrder = orderRepository.save(emptyOrder);
        savedOrder.getOrderLines().get(0).setOrderId(savedOrder.getId());
        return orderMapper.toDto(savedOrder);
    }

    private Order prepareEmptyOrder() {
        Order order = new Order();
        order.setUser(authorizedUserService.getAuthorizedUser());
        order.setPaymentType(PaymentType.NP);
        order.setStatus(OrderStatus.NEW);
        OrderLine orderLine = new OrderLine();
        orderLine.setOrderId(order.getId());
        order.setOrderLines(Collections.singletonList(orderLine));
        return order;
    }

    @Transactional
    @CacheEvict(key = "#orderId")
    public void delete(Long orderId) {
        orderRepository.findById(orderId)
                .ifPresent(order -> {
                    orderRepository.delete(order);
                    updateStockService.updateStockForDeletedOrder(order);
                    --TotalOrderQuantityHolder.cachedOrderQuantity;
                });
    }

}
