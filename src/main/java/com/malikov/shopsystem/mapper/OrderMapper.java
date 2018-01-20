package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author Yurii Malikov
 */
@Mapper(componentModel = "spring", uses = {OrderLineMapper.class})
public interface OrderMapper {

    @Mapping(source = "customer.id", target = "customerId", defaultValue = "0")
    @Mapping(source = "customer.note", target = "customerNote")
    @Mapping(source = "dateTimeCreated", target = "createdDateTime")
    @Mapping(source = "comment", target = "note")
    @Mapping(source = "totalSum", target = "totalSum", defaultValue = "0")
    OrderDto toDto(Order order);

}
