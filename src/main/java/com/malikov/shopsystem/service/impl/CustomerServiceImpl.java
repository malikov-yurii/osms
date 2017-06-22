package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.CustomerService;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.util.CustomerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.CustomerUtil.CustomerAutocompleteDtoListOf;
import static com.malikov.shopsystem.util.CustomerUtil.updateFromTo;
import static com.malikov.shopsystem.util.ValidationUtil.*;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;


    @Override
    public Customer create(CustomerDto customerDto) {
        checkIsNew(customerDto, "customer must be new");
        return customerRepository.save(CustomerUtil.createNewFromTo(customerDto));
    }

    @Override
    public void update(CustomerDto customerDto) {
        checkIsNotNew(customerDto, "customer must not be new");
        Customer customer = get(customerDto.getId());
        customerRepository.save(updateFromTo(customer, customerDto));
    }

    @Override
    public Customer get(Long id) {
        return checkNotFoundById(customerRepository.get(id), id);
    }

    @Override
    public List<CustomerDto> getAll() {
        return customerRepository.getAll()
                .stream()
                .map(CustomerUtil::asTo)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        checkNotFoundById(customerRepository.delete(id), id);
    }

    @Override
    public List<Customer> getByName(String name) {
        return customerRepository.getByName(name);
    }

    @Override
    public List<Customer> getByLastName(String lastName) {
        return customerRepository.getByLastName(lastName);
    }

    @Override
    public List<CustomerAutocompleteDto> getByFirstNameMask(String firstNameMask) {
        return CustomerAutocompleteDtoListOf(customerRepository.getByFirstNameMask(firstNameMask));
    }

    @Override
    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return CustomerAutocompleteDtoListOf(customerRepository.getByLastNameMask(lastNameMask));
    }

    @Override
    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return CustomerAutocompleteDtoListOf(customerRepository.getByPhoneNumberMask(phoneNumberMask));
    }

    @Override
    public List<CustomerAutocompleteDto> getByCityMask(String cityMask) {
        return CustomerAutocompleteDtoListOf(customerRepository.getByCityMask(cityMask));
    }

    @Override
    public List<Customer> getByCity(String city) {
        return customerRepository.getByCity(city);
    }

    @Override
    public Customer getByEmail(String email) {
        return checkNotFound(customerRepository.getByEmail(email), "not found by email=" + email);
    }

    @Override
    public Customer getByPhoneNumber(String phoneNumber) {
        return checkNotFound(customerRepository.getByPhoneNumber(phoneNumber), "not found by phone number=" + phoneNumber);
    }

    @Override
    public Customer persistCustomerFromOrder(Long orderId) {
        Order order = orderRepository.get(orderId);
        if (order.getCustomer() != null) {
            checkIsNew(order.getCustomer(), "Customer is not new");
        }
        order.setCustomer(customerRepository.save(
                new Customer(order.getCustomerName()
                        , order.getCustomerLastName()
                        , order.getCustomerPhoneNumber()
                        , order.getCustomerCity()
                        , order.getCustomerPostOffice()
                        , null
                        , null)));
        return orderRepository.save(order).getCustomer();
    }
}
