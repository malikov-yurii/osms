package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.Customer;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.dto.CustomerPage;
import com.malikov.shopsystem.mapper.CustomerMapper;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final CustomerMapper mapper;

    public CustomerService(CustomerRepository customerRepository,
                           OrderRepository orderRepository,
                           CustomerMapper mapper) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }

    public CustomerDto get(Long customerId) {
        return mapper.toDto(getCustomer(customerId));
    }

    private Customer getCustomer(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
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
        Customer customer = getCustomer(customerDto.getCustomerId());
        mapper.updateCustomer(customerDto, customer);
        return mapper.toDto(customerRepository.save(customer));
    }

    @Transactional
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return mapper.toAutocompleteDto(customerRepository.getByLastNameLike(atAnyPosition(lastNameMask)));
    }

    private String atAnyPosition(String subString) {
        return "%" + subString + "%";
    }

    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return mapper.toAutocompleteDto(customerRepository.getByPhoneNumberLike(atAnyPosition(phoneNumberMask)));
    }

    public List<CustomerAutocompleteDto> getByCityNameMask(String cityMask) {
        return mapper.toAutocompleteDto(customerRepository.getByCityLike(atAnyPosition(cityMask)));
    }

    @Transactional
    public CustomerDto createCustomerFromOrderData(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        Customer customer = customerRepository.save(mapper.toCustomer(order));

        order.setCustomerId(customer.getId());
        orderRepository.save(order);

        return mapper.toDto(customer);
    }

}
