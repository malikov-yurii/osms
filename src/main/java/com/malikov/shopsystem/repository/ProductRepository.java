package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Product;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

}
