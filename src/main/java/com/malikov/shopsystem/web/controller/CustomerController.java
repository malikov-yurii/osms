package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.service.CustomerService;
import com.malikov.shopsystem.dto.CustomerAutocompleteDto;
import com.malikov.shopsystem.dto.CustomerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public void createCustomer(@Valid CustomerDto customerDto) {
        customerService.create(customerDto);
    }

    @PutMapping
    public void updateCustomer(@Valid CustomerDto customerDto) {
        customerService.update(customerDto);
    }

    @DeleteMapping(value = "/{customerId}")
    public void delete(@PathVariable("customerId") Long customerId) {
        customerService.delete(customerId);
    }

    @GetMapping(value = "/autocomplete-by-last-name/{lastNameMask}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteDto> autocompleteLastName(
            @PathVariable("lastNameMask") String lastNameMask) {
        return customerService.getByLastNameMask(lastNameMask);
    }

    @GetMapping(value = "/autocomplete-by-phone-number/{phoneNumberMask}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteDto> autocompletePhoneNumber(
            @PathVariable("phoneNumberMask") String phoneNumberMask) {
        return customerService.getByPhoneNumberMask(phoneNumberMask);
    }

    @PostMapping(value = "/autocomplete-city", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteDto> autocompleteCity(@RequestParam("term") String cityMask) {
        return customerService.getByCityMask(cityMask);
    }

    @PostMapping(value = "/persist-customer-from-order/{orderId}")
    public void persistCustomerFromOrder(@PathVariable("orderId") Long orderId) {
        customerService.persistCustomerFromOrder(orderId);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerDto> getAll() {
        return customerService.getPage(0, 10000);
    }
}
