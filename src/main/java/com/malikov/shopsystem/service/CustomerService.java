package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;

import java.util.List;

public interface CustomerService {

    Customer create(CustomerDto customerDto);

    void update(CustomerDto customerDto);

    Customer get(Long id);

    void delete(Long id);

    List<Customer> getByName(String name);

    List<Customer> getByLastName(String lastName);

    List<CustomerAutocompleteDto> getByFirstNameMask(String firstNameMask);

    List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask);

    List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask);

    List<CustomerAutocompleteDto> getByCityMask(String cityMask);

    List<Customer> getByCity(String city);

    Customer getByEmail(String email);

    Customer getByPhoneNumber(String phoneNumber);

    Customer persistCustomerFromOrder(Long orderId);

    List<CustomerDto> getPage(int pageNumber, int pageCapacity);
}
