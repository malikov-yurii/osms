package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Product;

import java.util.Collection;

public interface ProductService extends Service<Product> {
    Collection<Product> getByCategoryId(int categoryId);

    Collection<Product> getAllQuantityLessThan(int quantity);

}
