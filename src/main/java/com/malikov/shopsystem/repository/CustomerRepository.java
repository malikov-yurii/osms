package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Customer;

import java.util.List;

public interface CustomerRepository extends Repository<Customer> {

    // null if not found
    List<Customer> getByName(String name);

    // null if not found
    List<Customer> getByLastName(String lastName);

    List<Customer> getByLastNameMask(String lastNameMask);

    // null if not found
    List<Customer> getByCity(String city);

    // null if not found
    Customer getByEmail(String email);

    // null if not found
    Customer getByPhoneNumber(String phoneNumber);
}
