package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.domain.ProductAggregator;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductAggregatorMapper {

    @Mapping(source = "id", target = "aggregatorId")
    @Mapping(source = "name", target = "aggregatorName")
    @Mapping(source = "quantity", target = "aggregatorQuantity")
    ProductAggregatorDto toDto(ProductAggregator source);

}
