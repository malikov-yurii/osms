package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.OrderLine;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrderLineRepository extends PagingAndSortingRepository<OrderLine, Long> {

}