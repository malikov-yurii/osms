package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.ProductVariationDto;
import com.malikov.shopsystem.model.ProductVariation;

/**
 * @author Yurii Malikov
 */
public class ProductVariationConverter {

    public static ProductVariationDto asDto(ProductVariation productVariation) {
        return new ProductVariationDto(
                productVariation.getProduct().getName() + " " + productVariation.getVariationValue().getName(),
                productVariation.getPrice(),
                productVariation.getQuantity());
    }

}
