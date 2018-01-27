package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long> {

    List<Customer> getByLastNameLike(String lastNameMask);

    List<Customer> getByPhoneNumberLike(String phoneNumberMask);

    List<Customer> getByCityLike(String cityNameMask);

}
