package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;

import java.util.List;
import java.util.stream.Collectors;

public class CustomerConverter {

    public static Customer createNewFromTo(CustomerDto customerDto) {
        return new Customer(null, customerDto.getCustomerFirstName(), customerDto.getCustomerLastName(),
                customerDto.getCustomerPhoneNumber(), customerDto.getDestinationCity(),
                customerDto.getDestinationPostOffice(), customerDto.getCustomerEmail(),
                customerDto.getCustomerNote());
    }

    public static CustomerDto asDto(Customer customer) {
        return new CustomerDto(
                customer.getId(),
                customer.getName() == null ? "" : customer.getName(),
                customer.getLastName() == null ? "" : customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getCity() == null ? "" : customer.getCity(),
                customer.getPostOffice() == null ? "" : customer.getPostOffice(),
                customer.getEmail() == null ? "" : customer.getEmail(),
                customer.getNote() == null ? "" : customer.getNote());
    }

    public static Customer updateFromTo(Customer customer, CustomerDto customerDto) {
        if (customerDto.getCustomerFirstName() != null) {
            customer.setName(customerDto.getCustomerFirstName());
        }
        if (customerDto.getCustomerLastName() != null) {
            customer.setLastName(customerDto.getCustomerLastName());
        }
        if (customerDto.getCustomerPhoneNumber() != null) {
            customer.setPhoneNumber(customerDto.getCustomerPhoneNumber());
        }
        if (customerDto.getDestinationCity() != null) {
            customer.setCity(customerDto.getDestinationCity());
        }
        if (customerDto.getDestinationPostOffice() != null) {
            customer.setPostOffice(customerDto.getDestinationPostOffice());
        }
        if (customerDto.getCustomerEmail() != null) {
            customer.setEmail(customerDto.getCustomerEmail());
        }
        if (customerDto.getCustomerNote() != null) {
            customer.setNote(customerDto.getCustomerNote());
        }
        return customer;
    }

    public static List<CustomerAutocompleteDto> CustomerAutocompleteDtoListOf(
            List<Customer> customers) {
        return customers.stream().map(customer ->
                new CustomerAutocompleteDto(
                        customer.getName() + " " + customer.getLastName()
                                + " " + customer.getCity()
                                + " " + customer.getPhoneNumber(),
                        customer.getId(),
                        customer.getName(),
                        customer.getLastName(),
                        customer.getPhoneNumber(),
                        customer.getCity(),
                        customer.getPostOffice()))
                .collect(Collectors.toList());
    }
}
