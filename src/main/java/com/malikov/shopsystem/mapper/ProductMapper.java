package com.malikov.shopsystem.mapper;

/**
 * @author Yurii Malikov
 */

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.model.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "id", target = "variationId")
    @Mapping(source = "product.id", target = "id")
    @Mapping(target = "name", expression = "java( source.getProduct().getName() + \" \" + source.getVariationValue().getName() )")
    @Mapping(source = "product.categories", target = "categories")
    @Mapping(target = "price", expression = "java( com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice(source) )")
    @Mapping(target = "aggregated", expression = "java( source.getProductAggregator() != null )")
    @Mapping(source = "product.imageFileName", target = "image")
    @Mapping(source = "product.unlimited", target = "unlimited")
    @Mapping(source = "product.supplier", target = "supplier")
    ProductDto toDto(ProductVariation source);

    @Mapping(target = "variationId", constant = "0")
    @Mapping(target = "aggregated", constant = "false")
    @Mapping(target = "price", expression = "java( com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice(source) )")
    @Mapping(source = "imageFileName", target = "image")
    ProductDto toDto(Product source);

    default String toString(ProductCategory category) {
        return category.getName();
    }

}
