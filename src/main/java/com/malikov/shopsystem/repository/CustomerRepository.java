package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long> {

    List<Customer> getByName(String firstName);

    List<Customer> getByLastName(String lastName);

    List<Customer> getByCity(String cityName);

    Customer getByPhoneNumber(String phoneNumber);

    Customer getByEmail(String email);

    List<Customer> getByNameLike(String firstNameMask);

    List<Customer> getByLastNameLike(String lastNameMask);

    List<Customer> getByPhoneNumberLike(String phoneNumberMask);

    List<Customer> getByCityLike(String cityNameMask);
}
