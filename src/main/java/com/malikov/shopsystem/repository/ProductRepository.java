package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Product;

import java.util.Collection;

public interface ProductRepository extends AbstractRepository<Product> {

    Collection<Product> getByCategoryId(int categoryId);

}
