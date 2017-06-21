package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.to.ProductDto;

import java.util.List;

public interface ProductService {

    Product get(Long id);

    List<ProductDto> getAllDtos();

    void delete(Long id);

    void update(Product product);

    void enableUnlimited(Long id, boolean unlimited);

    void enableHasVariations(Long id, boolean hasVariations);

    List<Product> getByProductNameMask(String productNameMask);

    //Collection<Product> getByCategoryId(Long categoryId);
    //Collection<Product> getAllQuantityLessThan(int quantity);
    //Product save(Product product);
}
