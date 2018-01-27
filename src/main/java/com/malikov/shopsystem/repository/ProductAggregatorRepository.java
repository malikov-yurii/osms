package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.ProductAggregator;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Yurii Malikov
 */
public interface ProductAggregatorRepository extends PagingAndSortingRepository<ProductAggregator, Long> {

}
