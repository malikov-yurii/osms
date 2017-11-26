package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.OrderLine;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrderItemRepository extends PagingAndSortingRepository<OrderLine, Long> {}