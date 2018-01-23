package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.Page;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

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

    List<OrderDto> toDto(List<Order> order);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "id", target = "customerId")
    @Mapping(source = "name", target = "customerFirstName")
    @Mapping(source = "lastName", target = "customerLastName")
    @Mapping(source = "phoneNumber", target = "customerPhoneNumber")
    @Mapping(source = "city", target = "destinationCity")
    @Mapping(source = "postOffice", target = "destinationPostOffice")
    void updateByCustomer(Customer source, @MappingTarget Order target);

    default Page<OrderDto> toDtoPage(org.springframework.data.domain.Page<Order> source) {

        Page<OrderDto> target = new Page<>();
        target.setContent(toDto(source.getContent()));
        target.setTotalElements(source.getTotalElements());
        target.setTotalPages(source.getTotalPages());

        return target;
    }

}
