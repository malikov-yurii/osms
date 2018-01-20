package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.mapper.CustomerMapper;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.ValidationUtil.*;

@Service
public class CustomerService {

    private static final String CUSTOMER_MUST_BE_NEW = "Customer must be new.";
    private static final String CUSTOMER_MUST_NOT_BE_NEW = "Customer must not be new";

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerMapper mapper;

    @Transactional
    public Customer create(CustomerDto customerDto) {
        checkIsNew(customerDto, CUSTOMER_MUST_BE_NEW);
        return customerRepository.save(mapper.toEntity(customerDto));
    }

    @Transactional
    public void update(CustomerDto customerDto) {
        checkIsNotNew(customerDto, CUSTOMER_MUST_NOT_BE_NEW);
        Customer customer = customerRepository.findOne(customerDto.getCustomerId());
        customerRepository.save(mapper.updateCustomer(customerDto, customer));
    }

    public CustomerDto get(Long id) {
        return mapper.toDto(checkNotFoundById(customerRepository.findOne(id), id));
    }

    @Transactional
    public void delete(Long id) {
        customerRepository.delete(id);
    }

    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return mapper.toCustomerAutocompleteDto(customerRepository.getByLastNameLike(mask(lastNameMask)));
    }

    private String mask(String lastNameMask) {
        return "%" + lastNameMask + "%";
    }

    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return mapper.toCustomerAutocompleteDto(customerRepository.getByPhoneNumberLike(mask(phoneNumberMask)));
    }

    public List<CustomerAutocompleteDto> getByCityMask(String cityMask) {
        return mapper.toCustomerAutocompleteDto(customerRepository.getByCityLike(mask(cityMask)));
    }

    @Transactional
    public Long createCustomer(Long orderId) {

        Order order = orderRepository.findOne(orderId);

        if (order.getCustomer() != null) {
            checkIsNew(order.getCustomer(), CUSTOMER_MUST_BE_NEW);
        }

        Customer customer = customerRepository.save(mapper.toCustomer(order));
        order.setCustomerId(customer.getId());

        orderRepository.save(order);

        return customer.getId();
    }

    public Page<CustomerDto> getPage(int pageNumber, int pageCapacity) {
        Page<Customer> page = customerRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        return new PageImpl<>(toCustomerDtos(page), null, page.getTotalElements());
    }

    private List<CustomerDto> toCustomerDtos(Page<Customer> page) {
        return page.getContent().stream().map(mapper::toDto).collect(Collectors.toList());
    }

}
