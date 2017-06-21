package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import com.malikov.shopsystem.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFound;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Override
    public ProductCategory save(ProductCategory productCategory) {
        return checkNotFound(productCategoryRepository.save(productCategory), "not found");
    }

    @Override
    public void update(ProductCategory productCategory) {
        checkNotFound(productCategoryRepository.save(productCategory), "not found");
    }

    @Override
    public ProductCategory get(Long id) {
        return checkNotFound(productCategoryRepository.get(id), "not found");
    }

    @Override
    public List<ProductCategory> getAll() {
        return productCategoryRepository.getAll();
    }

    @Override
    public void delete(Long id) {
        checkNotFound(productCategoryRepository.delete(id), "not found");
    }
}
