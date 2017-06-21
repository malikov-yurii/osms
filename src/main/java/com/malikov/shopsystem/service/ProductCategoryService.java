package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductCategory;

import java.util.List;

public interface ProductCategoryService {

    ProductCategory create(ProductCategory productCategory);

    void update(ProductCategory productCategory);

    ProductCategory get(Long id);

    List<ProductCategory> getAll();

    void delete(Long id);

}
