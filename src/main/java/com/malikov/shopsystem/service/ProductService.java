package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product get(Long id);

    void delete(Long id);

    void update(ProductDto productDto);

    //void enableUnlimited(Long id, boolean unlimited);
    //
    //void enableHasVariations(Long id, boolean hasVariations);

    List<Product> getByProductNameMask(String productNameMask);

    Page<ProductDto> getPage(int pageNumber, int pageCapacity);

    //Page<ProductDto> getPageByCategoryName(String categoryName, int pageNumber, int pageCapacity);

    //Collection<Product> getByCategoryId(Long categoryId);
    //Collection<Product> getAllQuantityLessThan(int quantity);
    //Product create(Product product);
}
