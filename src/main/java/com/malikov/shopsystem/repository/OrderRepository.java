package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Order;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface OrderRepository extends PagingAndSortingRepository<Order, Long>, JpaSpecificationExecutor<Order> {

}
