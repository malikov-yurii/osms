package com.malikov.shopsystem.service.product;

import com.google.common.collect.Streams;
import com.malikov.shopsystem.domain.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<String> getAllNames() {
        return Streams.stream(productCategoryRepository.findAll())
                .map(ProductCategory::getName)
                .collect(Collectors.toList());
    }

}
