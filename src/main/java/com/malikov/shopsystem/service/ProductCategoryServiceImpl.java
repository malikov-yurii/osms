package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
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
    public ProductCategory get(int id) {
        return repository.get(id);
    }

    @Override
    public List<ProductCategory> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }
}
