package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import com.malikov.shopsystem.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    ProductCategoryRepository repository;

    @Override
    public ProductCategory save(ProductCategory productCategory) {
        return repository.save(productCategory);
    }

    @Override
    public ProductCategory update(ProductCategory productCategory) {
        return repository.save(productCategory);
    }

    @Override
    public ProductCategory get(Long id) {
        return repository.get(id);
    }

    @Override
    public List<ProductCategory> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }

}
