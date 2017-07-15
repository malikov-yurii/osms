package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductVariationDto;
import com.malikov.shopsystem.model.ProductVariation;

import java.util.List;

public interface ProductVariationService {

    ProductVariation create(ProductVariation productVariation);

    void update(ProductVariation productVariation);

    ProductVariation get(Long id);

    void delete(Long id);

    List<ProductVariationDto> getPage(int pageNumber, int PageCapacity);
}
