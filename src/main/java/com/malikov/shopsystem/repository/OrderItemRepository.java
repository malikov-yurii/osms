package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.OrderItem;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrderItemRepository extends PagingAndSortingRepository<OrderItem, Long> {}