package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderPage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(uses = {OrderLineMapper.class})
public interface OrderMapper {

    @Mapping(source = "id", target = "orderId")
    @Mapping(source = "customer.id", target = "customerId", defaultValue = "0")
    @Mapping(source = "customer.note", target = "customerNote")
    @Mapping(source = "dateTimeCreated", target = "createdDateTime")
    @Mapping(source = "comment", target = "orderNote")
    @Mapping(target = "calculableItems", ignore = true)
    OrderDto toDto(Order order);

    List<OrderDto> toDtos(List<Order> order);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "id", target = "customerId")
    @Mapping(source = "name", target = "customerFirstName")
    @Mapping(source = "lastName", target = "customerLastName")
    @Mapping(source = "phoneNumber", target = "customerPhoneNumber")
    @Mapping(source = "city", target = "destinationCity")
    @Mapping(source = "postOffice", target = "destinationPostOffice")
    void updateByCustomer(Customer source, @MappingTarget Order target);

    default OrderPage toOrderPage(Page<Order> source) {
        OrderPage target = new OrderPage();

        target.setContent(toDtos(source.getContent()));
        target.setTotalElements(source.getTotalElements());

        return target;
    }

}