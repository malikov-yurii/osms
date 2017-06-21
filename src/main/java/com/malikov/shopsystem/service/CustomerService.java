package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Customer;

import java.util.Collection;
import java.util.List;

public interface CustomerService {

    Customer create(Customer customer);

    void update(Customer customer);

    Customer get(Long id);

    List<Customer> getAll();

    void delete(Long id);

    Collection<Customer> getByName(String name);

    Collection<Customer> getByLastName(String lastName);

    Collection<Customer> getByFirstNameMask(String firstNameMask);

    Collection<Customer> getByLastNameMask(String lastNameMask);

    Collection<Customer> getByPhoneNumberMask(String phoneNumberMask);

    Collection<Customer> getByCityMask(String cityMask);

    Collection<Customer> getByCity(String city);

    Customer getByEmail(String email);

    Customer getByPhoneNumber(String phoneNumber);

}
