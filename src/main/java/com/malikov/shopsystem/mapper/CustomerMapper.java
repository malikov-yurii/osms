package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.dto.CustomerPage;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper
public interface CustomerMapper {

    @Mapping(source = "customerId", target = "id")
    @Mapping(source = "customerFirstName", target = "name")
    @Mapping(source = "customerLastName", target = "lastName")
    @Mapping(source = "customerPhoneNumber", target = "phoneNumber")
    @Mapping(source = "customerCityName", target = "city")
    @Mapping(source = "customerPostOffice", target = "postOffice")
    @Mapping(source = "customerEmail", target = "email")
    @Mapping(source = "customerNote", target = "note")
    Customer toEntity(CustomerDto source);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "customerFirstName", target = "name")
    @Mapping(source = "customerLastName", target = "lastName")
    @Mapping(source = "customerPhoneNumber", target = "phoneNumber")
    @Mapping(source = "customerCityName", target = "city")
    @Mapping(source = "customerPostOffice", target = "postOffice")
    @Mapping(source = "customerEmail", target = "email")
    @Mapping(source = "customerNote", target = "note")
    Customer updateCustomer(CustomerDto source, @MappingTarget Customer customer);

    @Mapping(source = "id", target = "customerId")
    @Mapping(source = "name", target = "customerFirstName")
    @Mapping(source = "lastName", target = "customerLastName")
    @Mapping(source = "phoneNumber", target = "customerPhoneNumber")
    @Mapping(source = "city", target = "customerCityName")
    @Mapping(source = "postOffice", target = "customerPostOffice")
    @Mapping(source = "email", target = "customerEmail")
    @Mapping(source = "note", target = "customerNote")
    CustomerDto toDto(Customer source);

    List<CustomerDto> toDto(List<Customer> source);


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
    @Mapping(source = "city", target = "customerCityName")
    @Mapping(source = "postOffice", target = "customerPostOffice")
    @Mapping(source = "note", target = "customerNote")
    CustomerAutocompleteDto toAutocompleteDto(Customer customer);

    List<CustomerAutocompleteDto> toAutocompleteDto(List<Customer> customer);

    @AfterMapping
    default void afterToCustomerAutocompleteDto(Customer source, @MappingTarget CustomerAutocompleteDto target)  {

        target.setLabel(source.getName() + " " + source.getLastName() + " " +
                source.getCity() + " " + source.getPhoneNumber() + " " + source.getNote());
    }

    default CustomerPage toDtoPage(Page<Customer> source) {

        CustomerPage target = new CustomerPage();
        target.setContent(toDto(source.getContent()));
        target.setTotalElements(source.getTotalElements());

        return target;
    }

}
