package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.model.ProductAggregator;
import org.mapstruct.Mapper;

/**
 * @author Yurii Malikov
 */
@Mapper(componentModel = "spring")
public interface ProductAggregatorMapper {

    ProductAggregatorDto toDto(ProductAggregator source);

}
