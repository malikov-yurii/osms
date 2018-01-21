package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;

@Mapper(componentModel = "spring", nullValueCheckStrategy = ALWAYS)
public interface ProductUpdateByNotNullFieldsMapper {

    @Mapping(target = "id", ignore = true)
    void update(ProductDto source, @MappingTarget ProductVariation target);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "unlimited", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    void update(ProductDto source, @MappingTarget Product target);

}
