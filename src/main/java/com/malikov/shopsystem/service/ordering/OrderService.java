package com.malikov.shopsystem.service.ordering;

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
import com.malikov.shopsystem.mapper.OrderUpdateByNotNullFieldsMapper;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.UpdateStockService;
import com.malikov.shopsystem.service.caching.TotalOrderQuantityHolder;
import com.malikov.shopsystem.service.security.AuthorizedUserService;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.repository.specification.OrderSpecification.filteringBy;
import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;

@SuppressWarnings("ALL")
@Service
@Slf4j
@CacheConfig(cacheNames = OrderService.LAST_ORDERS_CACHE)
public class OrderService {

    public static final String LAST_ORDERS_CACHE = "lastOrders";
    private static final Sort DESC_ID = Sort.by(new Sort.Order(Sort.Direction.DESC, "id"));

    private final OrderRepository orderRepository;
    private final AuthorizedUserService authorizedUserService;
    private final CustomerRepository customerRepository;
    private final UpdateStockService updateStockService;
    private final OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper;
    private final OrderMapper orderMapper;
    private final CacheManager cacheManager;

    private Ehcache lastOrdersCache;

    public OrderService(OrderRepository orderRepository, AuthorizedUserService authorizedUserService,
                        CustomerRepository customerRepository, UpdateStockService updateStockService,
                        OrderUpdateByNotNullFieldsMapper orderUpdateByNotNullFieldsMapper, OrderMapper orderMapper,
                        CacheManager cacheManager) {
        this.orderRepository = orderRepository;
        this.authorizedUserService = authorizedUserService;
        this.customerRepository = customerRepository;
        this.updateStockService = updateStockService;
        this.orderUpdateByNotNullFieldsMapper = orderUpdateByNotNullFieldsMapper;
        this.orderMapper = orderMapper;
        this.cacheManager = cacheManager;
    }

    @PostConstruct
    private final void init() {
        lastOrdersCache = cacheManager.getEhcache(OrderService.LAST_ORDERS_CACHE);
    }


    public OrderPage getFilteredPage(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return orderMapper.toOrderPage(getOrderPageFilteredBy(filter));
    }

    private Page getOrderPageFilteredBy(GenericFilter<OrderFilterDto, OrderDto> filter) {
        return orderRepository.findAll(filteringBy(filter.getFilteringFields()), pageRequest(filter.getPaging()));
    }

    private PageRequest pageRequest(Paging paging) {
        return PageRequest.of(paging.getPage(), paging.getSize(), DESC_ID);
    }

    @Cacheable(key = "#orderId", unless = "true")
    public OrderDto get(Long orderId) {
        return orderMapper.toDto(getOrder(orderId));
    }

    private Order getOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException(Order.class, orderId));
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
        order.setOrderLines(new ArrayList<>(singleton(orderLine)));
        return order;
    }

    @Transactional
    @CachePut(key = "#orderDto.orderId")
    public OrderDto update(OrderDto orderDto) {

        Order order = getOrder(orderDto.getOrderId());

        setCustomerInfoToOrder(order, orderDto);
        orderUpdateByNotNullFieldsMapper.updateByNonCustomerRelatedInfo(orderDto, order);
        updateOrderStatus(orderDto.getStatus(), order);

        return orderMapper.toDto(orderRepository.save(order));
    }

    private void updateOrderStatus(OrderStatus newStatus, Order order) {
        if (nonNull(newStatus)) {
            updateStockService.updateStockDependingOnNewStatus(order, newStatus);
            order.setStatus(newStatus);
        }
    }

    private void setCustomerInfoToOrder(Order order, OrderDto orderDto) {
        if (nonNull(orderDto.getCustomerId())) {
            changeOrderCustomer(orderDto.getCustomerId(), order);
        } else {
            orderUpdateByNotNullFieldsMapper.updateByCustomerRelatedInfo(orderDto, order);
        }
    }

    private void changeOrderCustomer(Long customerId, Order order) {
        orderMapper.updateByCustomer(customerRepository.findById(customerId).orElse(null), order);
    }

    public OrderPage getPage(int pageNumber, int pageCapacity) {
        return shouldRetrieveFromCache(pageNumber, pageCapacity)
                ? getCachedOrdersPage(pageNumber, pageCapacity)
                : orderMapper.toOrderPage(orderRepository.findAll(PageRequest.of(pageNumber, pageCapacity, DESC_ID)));
    }

    private boolean shouldRetrieveFromCache(int pageNumber, int pageCapacity) {
        return ((pageNumber + 1) * pageCapacity) <= lastOrdersCache.getSize();
    }

    private OrderPage getCachedOrdersPage(int pageNumber, int pageSize) {
        return new OrderPage(pageContentFromCache(pageNumber, pageSize), TotalOrderQuantityHolder.cachedOrderQuantity);
    }

    private List<OrderDto> pageContentFromCache(int pageNumber, int pageSize) {
        Collection<Element> elements = lastOrdersCache.getAll(lastOrdersCache.getKeys()).values();
        return elements.stream()
                .map(element -> (OrderDto) element.getObjectValue())
                .sorted(Comparator.comparing(OrderDto::getOrderId).reversed())
                .limit((long) ((pageNumber + 1) * pageSize))
                .skip((long) (pageNumber * pageSize))
                .collect(Collectors.toList());
    }

}
