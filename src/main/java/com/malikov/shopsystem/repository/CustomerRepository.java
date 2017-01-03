package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Customer;

import java.util.Collection;

public interface CustomerRepository extends AbstractRepository<Customer>{

    // null if not found
    Collection<Customer> getByName(String name);

    // null if not found
    Collection<Customer> getByLastName(String lastName);

    // null if not found
    Collection<Customer> getByCity(String city);

    // null if not found
    Customer getByEmail(String email);

    // null if not found
    Customer getByPhoneNumber(String phoneNumber);
}
