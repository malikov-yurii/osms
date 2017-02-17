package com.malikov.shopsystem.web.customer;

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
    public CustomerTo getCustomerTo(@PathVariable("id") int id) {
        return CustomerUtil.asTo(super.get(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        super.delete(id);
    }

    @GetMapping
    public List<Customer> getAll() {
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

    //    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<String> update(@Valid  CustomerTo customerTo, @PathVariable("id") int id, BindingResult result) {
//        if (result.hasErrors()) {
//            StringBuilder sb = new StringBuilder();
//            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
//            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
//        }
//        super.update(CustomerUtil.createNewFromTo(customerTo), id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PostMapping(value = "/{id}")
    public void update(@Valid  CustomerTo customerTo, @PathVariable("id") int id) {

        super.update(CustomerUtil.createNewFromTo(customerTo), id);

    }
}