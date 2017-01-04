package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

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
    public Product get(int id) {
        return repository.get(id);
    }

    @Override
    public Collection<Product> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

    @Override
    public Collection<Product> getByCategoryId(int categoryId) {
        return repository.getByCategoryId(categoryId);
    }

    @Override
    public Collection<Product> getAllQuantityLessThan(int quantity) {
        return repository.getAllQuantityLessThan(quantity);
    }
}
