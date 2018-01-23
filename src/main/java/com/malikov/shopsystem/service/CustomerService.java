package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.dto.CustomerPage;
import com.malikov.shopsystem.mapper.CustomerMapper;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkIsNew;
import static com.malikov.shopsystem.util.ValidationUtil.checkIsNotNew;
import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class CustomerService {

    private static final String CUSTOMER_MUST_BE_NEW = "Customer must be new.";
    private static final String CUSTOMER_MUST_NOT_BE_NEW = "Customer must not be new.";

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerMapper mapper;

    public CustomerDto get(Long id) {
        return mapper.toDto(checkNotFoundById(customerRepository.findOne(id), id));
    }

    public CustomerPage getPage(int pageNumber, int pageCapacity) {
        return mapper.toDtoPage(customerRepository.findAll(new PageRequest(pageNumber, pageCapacity)));
    }

    @Transactional
    public Customer create(CustomerDto customerDto) {
        checkIsNew(customerDto, CUSTOMER_MUST_BE_NEW);
        return customerRepository.save(mapper.toEntity(customerDto));
    }

    @Transactional
    public CustomerDto update(CustomerDto customerDto) {
        checkIsNotNew(customerDto, CUSTOMER_MUST_NOT_BE_NEW);
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

        if (order.getCustomer() != null) {
            checkIsNew(order.getCustomer(), CUSTOMER_MUST_BE_NEW);
        }

        Customer customer = customerRepository.save(mapper.toCustomer(order));
        order.setCustomerId(customer.getId());

        orderRepository.save(order);

        return mapper.toDto(customer);
    }

}
