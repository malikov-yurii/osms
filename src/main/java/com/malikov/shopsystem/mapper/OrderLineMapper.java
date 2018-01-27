package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.domain.OrderLine;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.math.RoundingMode;
import java.util.List;

/**
 * @author Yurii Malikov
 */
@Mapper(componentModel = "spring")
public abstract class OrderLineMapper {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "productVariation.id", target = "productVariationId")
    @Mapping(source = "productName", target = "orderLineProductName")
    @Mapping(source = "productQuantity", target = "orderLineProductQuantity")
    @Mapping(source = "product.supplier", target = "supplier")
    public abstract OrderLineDto toDto(OrderLine source);

    @AfterMapping
    protected void afterToDto(OrderLine source, @MappingTarget OrderLineDto target) {
        target.setOrderLineProductPrice(source.getProductPrice().setScale(0, RoundingMode.HALF_UP));
    }

    public abstract List<OrderLineDto> toDto(List<OrderLine> source);

}
