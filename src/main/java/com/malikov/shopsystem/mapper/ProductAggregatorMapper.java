package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.ProductAggregator;
import com.malikov.shopsystem.dto.ProductAggregatorDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProductAggregatorMapper {

    @Mapping(source = "id", target = "aggregatorId")
    @Mapping(source = "name", target = "aggregatorName")
    @Mapping(source = "quantity", target = "aggregatorQuantity")
    ProductAggregatorDto toDto(ProductAggregator source);

}
