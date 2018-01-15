package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.repository.CustomerRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.util.CustomerConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.CustomerConverter.CustomerAutocompleteDtoListOf;
import static com.malikov.shopsystem.util.CustomerConverter.updateFromTo;
import static com.malikov.shopsystem.util.ValidationUtil.*;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Customer create(CustomerDto customerDto) {
        checkIsNew(customerDto, "customer must be new");
        return customerRepository.save(CustomerConverter.createNewFromTo(customerDto));
    }

    @Transactional
    public void update(CustomerDto customerDto) {
        checkIsNotNew(customerDto, "customer must not be new");
        Customer customer = customerRepository.findOne(customerDto.getId());
        customerRepository.save(updateFromTo(customer, customerDto));
    }

    public CustomerDto get(Long id) {
        return CustomerConverter.asDto(checkNotFoundById(customerRepository.findOne(id), id));
    }

    @Transactional
    public void delete(Long id) {
        customerRepository.delete(id);
    }

    public List<CustomerAutocompleteDto> getByLastNameMask(String lastNameMask) {
        return CustomerAutocompleteDtoListOf(
                customerRepository.getByLastNameLike("%" + lastNameMask + "%"));
    }

    public List<CustomerAutocompleteDto> getByPhoneNumberMask(String phoneNumberMask) {
        return CustomerAutocompleteDtoListOf(
                customerRepository.getByPhoneNumberLike("%" + phoneNumberMask + "%"));
    }

    public List<CustomerAutocompleteDto> getByCityMask(String cityMask) {
        return CustomerAutocompleteDtoListOf(customerRepository.getByCityLike("%" + cityMask + "%"));
    }

    @Transactional
    public Long persistCustomerFromOrder(Long orderId) {
        Order order = orderRepository.findOne(orderId);
        if (order.getCustomer() != null) {
            checkIsNew(order.getCustomer(), "Customer is not new");
        }
        Customer customer = new Customer();
        customer.setName(order.getCustomerFirstName());
        customer.setLastName(order.getCustomerLastName());
        customer.setPhoneNumber(order.getCustomerPhoneNumber());
        customer.setCity(order.getDestinationCity());
        customer.setPostOffice(order.getDestinationPostOffice());

        customer = customerRepository.save(customer);
        order.setCustomerId(customer.getId());
        orderRepository.save(order);

        return customer.getId();
    }

    public Page<CustomerDto> getPage(int pageNumber, int pageCapacity) {
        Page<Customer> page = customerRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(CustomerConverter::asDto)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

}
