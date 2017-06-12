package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Customer;

import java.util.List;

public interface CustomerRepository extends Repository<Customer> {

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByName(String firstNameMask);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByLastName(String lastName);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByCity(String city);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    Customer getByPhoneNumber(String phoneNumber);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    Customer getByEmail(String email);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByFirstNameMask(String firstNameMask);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByLastNameMask(String lastNameMask);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByPhoneNumberMask(String phoneNumberMask);

    /**
     * @return List of customers found by mask or empty list if not found any
     */
    List<Customer> getByCityMask(String cityMask);

}
