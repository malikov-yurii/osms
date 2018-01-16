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

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerMapper customerMapper;

    @Transactional
    public Customer create(CustomerDto customerDto) {
        checkIsNew(customerDto, "customer must be new");
        return customerRepository.save(customerMapper.toEntity(customerDto));
    }

    @Transactional
    public void update(CustomerDto customerDto) {
        checkIsNotNew(customerDto, "customer must not be new");
        Customer customer = customerRepository.findOne(customerDto.getCustomerId());
        customerRepository.save(customerMapper.updateCustomer(customerDto, customer));
    }

    public CustomerDto get(Long id) {
        return customerMapper.toDto(checkNotFoundById(customerRepository.findOne(id), id));
    }

    @Transactional
    public void delete(Long id) {
        customerRepository.delete(id);
    }

    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return customerMapper.toCustomerAutocompleteDto(
                customerRepository.getByLastNameLike("%" + lastNameMask + "%"));
    }

    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return customerMapper.toCustomerAutocompleteDto(
                customerRepository.getByPhoneNumberLike("%" + phoneNumberMask + "%"));
    }

    public List<CustomerAutocompleteDto> getByCityMask(String cityMask) {
        return customerMapper.toCustomerAutocompleteDto(customerRepository.getByCityLike("%" + cityMask + "%"));
    }

    @Transactional
    public Long persistCustomerFromOrder(Long orderId) {
        Order order = orderRepository.findOne(orderId);

        if (order.getCustomer() != null) {
            checkIsNew(order.getCustomer(), "Customer is not new");
        }

        Customer customer = customerRepository.save(customerMapper.toCustomer(order));

        order.setCustomerId(customer.getId());
        orderRepository.save(order);

        return customer.getId();
    }

    public Page<CustomerDto> getPage(int pageNumber, int pageCapacity) {
        Page<Customer> page = customerRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(customerMapper::toDto)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

}
