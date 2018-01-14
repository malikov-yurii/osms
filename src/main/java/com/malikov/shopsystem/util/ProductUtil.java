package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductCategory;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice;
import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice;
import static java.util.Objects.nonNull;

public class ProductUtil {

    public static List<ProductDto> getDtosFrom(Product product) {
        List<ProductDto> productDtos = new ArrayList<>();
        if (product.getHasVariations()) {
            productDtos.addAll(product.getVariations()
                    .stream()
                    .map(productVariation -> new ProductDto(
                            product.getId(), productVariation.getId(),
                            product.getName() + " " + productVariation.getVariationValue().getName(),
                            getCategoryNames(product),
                            calculateProductVariationPrice(productVariation),
                            productVariation.getQuantity(),
                            product.getUnlimited(),
                            product.getSupplier(),
                            nonNull(productVariation.getProductAggregator()),
                            product.getImageFileName()
                    ))
                    .collect(Collectors.toList()));
        } else {
            productDtos.add(new ProductDto(
                    product.getId(), 0L, product.getName(),
                    getCategoryNames(product),
                    calculateProductPrice(product),
                    product.getQuantity(), product.getUnlimited(), product.getSupplier(), false,
                    product.getImageFileName()
            ));
        }
        return productDtos;
    }

    private static Set<String> getCategoryNames(Product product) {
        return product.getCategories().stream().map(ProductCategory::getName).collect(Collectors.toSet());
    }
}
