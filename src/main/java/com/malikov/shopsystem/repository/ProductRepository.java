package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Product;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends Repository<Product> {

    Collection<Product> getByCategoryId(Long categoryId);

    Collection<Product> getAllQuantityLessThan(int quantity);

    List<Product> getByProductNameMask(String productNameMask);

}
