package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository repository;

    @Override
    public Product save(Product product) {
        return repository.save(product);
    }

    @Override
    public Product update(Product product) {
        return repository.save(product);
    }

    @Override
    public Product get(Long id) {
        return repository.get(id);
    }

    @Override
    public List<Product> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }

    @Override
    public Collection<Product> getByCategoryId(Long categoryId) {
        return repository.getByCategoryId(categoryId);
    }

    @Override
    public Collection<Product> getAllQuantityLessThan(int quantity) {
        return repository.getAllQuantityLessThan(quantity);
    }

    @Override
    public void enableUnlimited(Long id, boolean unlimited){
        Product product = get(id);
        product.setUnlimited(unlimited);
        update(product);
    }

    @Override
    public void enableHasVariations(Long id, boolean hasVariations){
        Product product = get(id);
        product.setHasVariations(hasVariations);
        update(product);
    }

    @Override
    public List<Product> getByProductNameMask(String productNameMask) {
        return repository.getByProductNameMask(productNameMask);
    }

}
