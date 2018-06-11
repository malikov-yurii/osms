package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ProductUpdateByNotNullFieldsMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "productPrice", target = "price")
    @Mapping(source = "productQuantity", target = "quantity")
    void update(ProductDto source, @MappingTarget ProductVariation target);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "unlimited", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(source = "productPrice", target = "price")
    @Mapping(source = "productQuantity", target = "quantity")
    void update(ProductDto source, @MappingTarget Product target);

}
