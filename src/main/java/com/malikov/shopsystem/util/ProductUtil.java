package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductUtil {

    public static Product createNewFromTo(ProductDto productDto) {
        return new Product(null, productDto.getName(), productDto.getPrice(),
                false, productDto.getQuantity(), false, null);
    }

    public static Product updateFromTo(Product product, ProductDto productDto) {
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        return product;
    }

    public static List<ProductDto> getDtosFrom(Product product) {
        List<ProductDto> productDtos = new ArrayList<>();
        if (product.getHasVariations()) {
            productDtos.addAll(product.getVariations()
                    .stream()
                    .map(productVariation -> new ProductDto(
                            product.getId(), productVariation.getId(),
                            product.getCategories(),
                            product.getName() + " "
                                    + productVariation.getVariationValue().getName(),
                            productVariation.getPrice(),
                            productVariation.getQuantity(),
                            product.getUnlimited(),
                            product.getSupplier()))
                    .collect(Collectors.toList()));
        } else {
            productDtos.add(new ProductDto(
                    product.getId(), 0L, product.getCategories(),
                    product.getName(), product.getPrice(),
                    product.getQuantity(), product.getUnlimited(), product.getSupplier()));
        }
        return productDtos;
    }
}
