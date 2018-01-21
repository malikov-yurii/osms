package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.collect.Streams.stream;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<String> getAllNames() {

        return stream(productCategoryRepository.findAll())
                .map(ProductCategory::getName)
                .collect(Collectors.toList());
    }

}
