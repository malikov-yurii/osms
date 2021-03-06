package com.malikov.shopsystem.service.order.cache;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderPage;
import com.malikov.shopsystem.service.order.OrderService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetCachedOrdersPageService {

    private final CacheManager cacheManager;

    public GetCachedOrdersPageService(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public OrderPage getCachedOrdersPage(int pageNumber, int pageSize) {
        return new OrderPage(pageContentFromCache(pageNumber, pageSize), TotalOrderQuantityHolder.cachedOrderQuantity);
    }

    private List<OrderDto> pageContentFromCache(int pageNumber, int pageSize) {
        Ehcache lastOrdersCache = lastOrdersCache();
        Collection<Element> elements = lastOrdersCache.getAll(lastOrdersCache.getKeys()).values();
        return elements.stream()
                .map(element -> (OrderDto) element.getObjectValue())
                .sorted(Comparator.comparing(OrderDto::getOrderId).reversed())
                .limit((long) ((pageNumber + 1) * pageSize))
                .skip((long) (pageNumber * pageSize))
                .collect(Collectors.toList());
    }

    private Ehcache lastOrdersCache() {
        return cacheManager.getEhcache(OrderService.LAST_ORDERS_CACHE);
    }

    public boolean isPageInLastOrdersCache(int pageNumber, int pageCapacity) {
        return ((pageNumber + 1) * pageCapacity) <= lastOrdersCache().getSize();
    }

}
