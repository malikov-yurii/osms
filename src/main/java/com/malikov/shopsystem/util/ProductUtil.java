package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductCategory;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

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
                            product.getName() + " "
                                    + productVariation.getVariationValue().getName(),
                            getCategoryNames(product),
                            productVariation.getPrice(),
                            productVariation.getQuantity(),
                            product.getUnlimited(),
                            product.getSupplier(),
                            nonNull(productVariation.getProductAggregator())))
                    .collect(Collectors.toList()));
        } else {
            productDtos.add(new ProductDto(
                    product.getId(), 0L, product.getName(),
                    getCategoryNames(product),
                    product.getPrice(),product.getQuantity(), product.getUnlimited(), product.getSupplier(), false));
        }
        return productDtos;
    }

    private static Set<String> getCategoryNames(Product product) {
        return product.getCategories().stream().map(ProductCategory::getName).collect(Collectors.toSet());
    }
}
