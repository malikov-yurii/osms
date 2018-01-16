package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * @author Yurii Malikov
 */
@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(source = "customerId", target = "id")
    @Mapping(source = "customerFirstName", target = "name")
    @Mapping(source = "customerLastName", target = "lastName")
    @Mapping(source = "customerPhoneNumber", target = "phoneNumber")
    @Mapping(source = "destinationCity", target = "city")
    @Mapping(source = "destinationPostOffice", target = "postOffice")
    @Mapping(source = "customerEmail", target = "email")
    @Mapping(source = "customerNote", target = "note")
    Customer toEntity(CustomerDto source);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "customerFirstName", target = "name")
    @Mapping(source = "customerLastName", target = "lastName")
    @Mapping(source = "customerPhoneNumber", target = "phoneNumber")
    @Mapping(source = "destinationCity", target = "city")
    @Mapping(source = "destinationPostOffice", target = "postOffice")
    @Mapping(source = "customerEmail", target = "email")
    @Mapping(source = "customerNote", target = "note")
    Customer updateCustomer(CustomerDto source, @MappingTarget Customer customer);

    @Mapping(source = "id", target = "customerId")
    @Mapping(source = "name", target = "customerFirstName")
    @Mapping(source = "lastName", target = "customerLastName")
    @Mapping(source = "phoneNumber", target = "customerPhoneNumber")
    @Mapping(source = "city", target = "destinationCity")
    @Mapping(source = "postOffice", target = "destinationPostOffice")
    @Mapping(source = "email", target = "customerEmail")
    @Mapping(source = "note", target = "customerNote")
    CustomerDto toDto(Customer source);


    @Mapping(target = "id", ignore = true)
    @Mapping(source = "customerFirstName", target = "name")
    @Mapping(source = "customerLastName", target = "lastName")
    @Mapping(source = "customerPhoneNumber", target = "phoneNumber")
    @Mapping(source = "destinationCity", target = "city")
    @Mapping(source = "destinationPostOffice", target = "postOffice")
    Customer toCustomer(Order source);

    @Mapping(source = "id", target = "customerId")
    @Mapping(source = "name", target = "customerFirstName")
    @Mapping(source = "lastName", target = "customerLastName")
    @Mapping(source = "phoneNumber", target = "customerPhoneNumber")
    @Mapping(source = "city", target = "destinationCity")
    @Mapping(source = "postOffice", target = "destinationPostOffice")
    CustomerAutocompleteDto toCustomerAutocompleteDto(Customer customer);

    List<CustomerAutocompleteDto> toCustomerAutocompleteDto(List<Customer> customer);

    @AfterMapping
    default void afterToCustomerAutocompleteDto(Customer source, @MappingTarget CustomerAutocompleteDto target)  {

        target.setLabel(source.getName() + " " + source.getLastName() + " " +
                source.getCity() + " " + source.getPhoneNumber());
    }

}
