package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.model.OrderLine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * @author Yurii Malikov
 */
@Mapper(componentModel = "spring")
public interface OrderLineMapper {

    @Mapping(source = "id", target = "orderItemId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "productVariation.id", target = "productVariationId")
    @Mapping(source = "productName", target = "name")
    @Mapping(source = "productQuantity", target = "quantity")
    @Mapping(source = "productPrice", target = "price")
    @Mapping(source = "product.supplier", target = "supplier")
    OrderLineDto toDto(OrderLine source);

    List<OrderLineDto> toDto(List<OrderLine> source);

}
