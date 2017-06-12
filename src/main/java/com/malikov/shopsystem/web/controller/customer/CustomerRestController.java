package com.malikov.shopsystem.web.controller.customer;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.to.CustomerTo;
import com.malikov.shopsystem.util.CustomerUtil;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = CustomerRestController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerRestController extends AbstractCustomerController {

    static final String REST_URL = "/rest/profile/customers";

    @GetMapping(value = "/{id}")
    public CustomerTo getCustomerTo(@PathVariable("id") Long id) {
        return CustomerUtil.asTo(super.get(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        super.delete(id);
    }

    @GetMapping
    public List<CustomerTo> getAll() {
        return super.getAll();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> createWithLocation(@RequestBody Customer customer) {
        Customer created = super.create(customer);

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uriOfNewResource).body(created);
    }

    @PostMapping(value = "/{id}")
    public void update(@Valid  CustomerTo customerTo, @PathVariable("id") Long id) {

        super.update(CustomerUtil.createNewFromTo(customerTo), id);

    }
}