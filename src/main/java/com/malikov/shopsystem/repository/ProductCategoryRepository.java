package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.ProductCategory;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, Long> {

}
