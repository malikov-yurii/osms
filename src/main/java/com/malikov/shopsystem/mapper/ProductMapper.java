package com.malikov.shopsystem.mapper;

/**
 * @author Yurii Malikov
 */

import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.model.ProductVariation;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice;
import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice;
import static java.util.Collections.singleton;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "aggregated", expression = "java( source.getProductAggregator() != null )")
    @Mapping(source = "id", target = "variationId")
    @Mapping(source = "product.id", target = "id")
    @Mapping(source = "product.categories", target = "categories")
    @Mapping(source = "product.imageFileName", target = "image")
    @Mapping(source = "product.unlimited", target = "unlimited")
    @Mapping(source = "product.supplier", target = "supplier")
    ProductDto toDto(ProductVariation source);

    @AfterMapping
    default void afterToDto(ProductVariation source, @MappingTarget ProductDto target) {
        target.setName(productVariationFullName(source));
        target.setPrice(calculateProductVariationPrice(source));
    }

    default String productVariationFullName(ProductVariation source) {
        return source.getProduct().getName() + " " + source.getVariationValue().getName();
    }

    @Mapping(target = "variationId", constant = "0")
    @Mapping(target = "aggregated", constant = "false")
    @Mapping(source = "imageFileName", target = "image")
    ProductDto toDto(Product source);

    @AfterMapping
    default void afterToDto(Product source, @MappingTarget ProductDto target) {
        target.setPrice(calculateProductPrice(source));
    }

    @Mapping(target = "price", ignore = true)
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "id", target = "productVariationId")
    ProductAutocompleteDto toAutocompleteDto(ProductVariation source);

    List<ProductAutocompleteDto> toAutocompleteDto(List<ProductVariation> source);

    @AfterMapping
    default void afterToDto(ProductVariation source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productVariationPrice = calculateProductVariationPrice(source);
        final String productVariationFullName = productVariationFullName(source);
        target.setLabel(productVariationFullName + productVariationPrice);
        target.setName(productVariationFullName);
        target.setPrice(productVariationPrice);
    }

    @Mapping(target = "price", ignore = true)
    @Mapping(source = "id", target = "productId")
    @Mapping(target = "productVariationId", constant = "0")
    ProductAutocompleteDto toAutocompleteDto(Product source);

    default Collection<ProductAutocompleteDto> toAutocompleteDtoSingleton(Product product) {
        return singleton(toAutocompleteDto(product));
    }

    @AfterMapping
    default void afterToDto(Product source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productPrice = calculateProductPrice(source);
        target.setLabel(source.getName() + " " + productPrice);
        target.setPrice(productPrice);
    }

    default String toString(ProductCategory category) {
        return category.getName();
    }
}
