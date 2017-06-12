package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Product;

import java.util.Collection;
import java.util.List;

public interface ProductService extends Service<Product> {

    Collection<Product> getByCategoryId(Long categoryId);

    Collection<Product> getAllQuantityLessThan(int quantity);

    void enableUnlimited(Long id, boolean unlimited);

    void enableHasVariations(Long id, boolean hasVariations);

    List<Product> getByProductNameMask(String productNameMask);

}
