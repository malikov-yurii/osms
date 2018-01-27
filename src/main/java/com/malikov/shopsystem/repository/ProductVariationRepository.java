package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.ProductVariation;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductVariationRepository extends PagingAndSortingRepository<ProductVariation, Long> {

}
