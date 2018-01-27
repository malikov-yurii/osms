package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.dto.CustomerPage;
import com.malikov.shopsystem.mapper.CustomerMapper;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerMapper mapper;

    public CustomerDto get(Long id) {
        return mapper.toDto(customerRepository.findOne(id));
    }

    public CustomerPage getPage(int pageNumber, int pageCapacity) {
        return mapper.toDtoPage(customerRepository.findAll(new PageRequest(pageNumber, pageCapacity)));
    }

    @Transactional
    public Customer create(CustomerDto customerDto) {
        return customerRepository.save(mapper.toEntity(customerDto));
    }

    @Transactional
    public CustomerDto update(CustomerDto customerDto) {
        Customer customer = customerRepository.findOne(customerDto.getCustomerId());
        return mapper.toDto(customerRepository.save(mapper.updateCustomer(customerDto, customer)));
    }

    @Transactional
    public void delete(Long id) {
        customerRepository.delete(id);
    }

    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return mapper.toAutocompleteDto(customerRepository.getByLastNameLike(atAnyPosition(lastNameMask)));
    }

    private String atAnyPosition(String lastNameMask) {
        return "%" + lastNameMask + "%";
    }

    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return mapper.toAutocompleteDto(customerRepository.getByPhoneNumberLike(atAnyPosition(phoneNumberMask)));
    }

    public List<CustomerAutocompleteDto> getByCityNameMask(String cityMask) {
        return mapper.toAutocompleteDto(customerRepository.getByCityLike(atAnyPosition(cityMask)));
    }

    @Transactional
    public CustomerDto createCustomerFromOrderData(Long orderId) {

        Order order = orderRepository.findOne(orderId);
        Customer customer = customerRepository.save(mapper.toCustomer(order));

        order.setCustomerId(customer.getId());
        orderRepository.save(order);

        return mapper.toDto(customer);
    }

}
