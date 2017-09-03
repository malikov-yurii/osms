package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;

import java.util.List;
import java.util.stream.Collectors;

public class CustomerConverter {

    public static Customer createNewFromTo(CustomerDto customerDto) {
        return new Customer(null, customerDto.getFirstName(), customerDto.getLastName(),
                customerDto.getPhoneNumber(), customerDto.getCity(),
                customerDto.getPostOffice(), customerDto.getEmail(),
                customerDto.getNote());
    }

    public static CustomerDto asDto(Customer customer){
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
        if (customerDto.getFirstName() != null) {
            customer.setName(customerDto.getFirstName());
        }
        if (customerDto.getLastName() != null) {
            customer.setLastName(customerDto.getLastName());
        }
        if (customerDto.getPhoneNumber() != null) {
            customer.setPhoneNumber(customerDto.getPhoneNumber());
        }
        if (customerDto.getCity() != null) {
            customer.setCity(customerDto.getCity());
        }
        if (customerDto.getPostOffice() != null) {
            customer.setPostOffice(customerDto.getPostOffice());
        }
        if (customerDto.getPhoneNumber() != null) {
            customer.setEmail(customerDto.getEmail());
        }
        if (customerDto.getNote() != null) {
            customer.setNote(customerDto.getNote());
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
