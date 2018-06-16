package com.malikov.shopsystem.service.order.cache;

import com.malikov.shopsystem.core.calculation.ValueCalculator;
import com.malikov.shopsystem.core.strategy.collection.ModifyCollectionStrategy;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.OrderPage;
import com.malikov.shopsystem.service.order.OrderService;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@CacheConfig(cacheNames = OrderService.LAST_ORDERS_CACHE)
@Slf4j
public class RefreshLastOrdersCacheService {

    private static final int FIVE_MINUTES = 5 * 60 * 1000;

    private final CacheManager cacheManager;
    private final OrderService orderService;

    @Value("${cache.initial-size}")
    private Integer initialCacheSize;

    private Ehcache lastOrdersCache;

    public RefreshLastOrdersCacheService(CacheManager cacheManager, OrderService orderService) {
        this.cacheManager = cacheManager;
        this.orderService = orderService;
    }

    @PostConstruct
    private final void init() {
        lastOrdersCache = cacheManager.getEhcache(OrderService.LAST_ORDERS_CACHE);
    }

    @Scheduled(fixedDelay = FIVE_MINUTES)
    protected void refreshCache() {
        List<Element> queriedOrders = new ArrayList<>();
        Set queriedOrderKeys = new HashSet();
        OrderPage orderPage = orderService.getPage(0, initialCacheSize);
        orderPage.getContent().stream()
                .forEach(order -> {
                    Long orderId = order.getOrderId();
                    queriedOrders.add(new Element(orderId, order));
                    queriedOrderKeys.add(orderId);
                });
        retainInLastOrdersCache(queriedOrderKeys);
        lastOrdersCache.putAll(queriedOrders);
        TotalOrderQuantityHolder.cachedOrderQuantity = orderPage.getTotalElements();
    }

    private void retainInLastOrdersCache(Set queriedOrderKeys) {
        List ordersToEvictFromCache = lastOrdersCache.getKeys();
        ordersToEvictFromCache.removeAll(queriedOrderKeys);
        lastOrdersCache.removeAll(ordersToEvictFromCache);
    }

    @CachePut(key = "#result.orderId", condition = "#result != null")
    public OrderDto updateLastOrdersCache(OrderLineDto orderLineDto,
                                          ModifyCollectionStrategy<OrderLineDto> strategy) {
        Long orderId = orderLineDto.getOrderId();
        return Optional.ofNullable(lastOrdersCache.get(orderId))
                .map(element -> {
                    OrderDto order = (OrderDto) element.getObjectValue();
                    List<OrderLineDto> orderLines = order.getOrderLines();
                    strategy.execute(orderLines, orderLineDto);
                    order.setTotalValue(ValueCalculator.calculate(order));
                    return order;
                })
                .orElse(null);
    }

}
