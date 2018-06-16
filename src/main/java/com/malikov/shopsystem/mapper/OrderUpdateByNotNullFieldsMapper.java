package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.OrderDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;

@Mapper(nullValueCheckStrategy = ALWAYS)
public interface OrderUpdateByNotNullFieldsMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "paymentType", ignore = true)
    @Mapping(target = "totalValue", ignore = true)
    @Mapping(target = "customerId", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "dateTimeCreated", ignore = true)
    @Mapping(target = "orderLines", ignore = true)
    void updateByCustomerRelatedInfo(OrderDto source, @MappingTarget Order target);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customerId", ignore = true)
    @Mapping(target = "customerPhoneNumber", ignore = true)
    @Mapping(target = "customerFirstName", ignore = true)
    @Mapping(target = "customerLastName", ignore = true)
    @Mapping(target = "destinationCity", ignore = true)
    @Mapping(target = "destinationPostOffice", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "dateTimeCreated", ignore = true)
    @Mapping(source = "orderNote", target = "comment")
    @Mapping(target = "orderLines", ignore = true)
    void updateByNonCustomerRelatedInfo(OrderDto source, @MappingTarget Order target);

}
