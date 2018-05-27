package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.collect.Streams.stream;

@Service
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<String> getAllNames() {

        return stream(productCategoryRepository.findAll())
                .map(ProductCategory::getName)
                .collect(Collectors.toList());
    }

}
