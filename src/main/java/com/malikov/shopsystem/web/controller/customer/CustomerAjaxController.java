package com.malikov.shopsystem.web.controller.customer;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.to.CustomerTo;
import com.malikov.shopsystem.util.CustomerUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/ajax/profile/customers")
public class CustomerAjaxController extends AbstractCustomerController {

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerTo> getAll() {
        return super.getAll();
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        super.delete(id);
    }

    @PostMapping
    public ResponseEntity<String> updateOrCreate(@Valid CustomerTo customerTo, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (customerTo.isNew()) {
            super.create(CustomerUtil.createNewFromTo(customerTo));
        } else {
            Customer customer = super.get(customerTo.getId());
            super.update(CustomerUtil.updateFromTo(customer, customerTo), customerTo.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/get-email")
    public String getEmail(@PathVariable("id") Long id) {
        return super.getEmail(id);
    }

    @GetMapping(value = "/{id}/get-note")
    public String getNote(@PathVariable("id") Long id) {
        return super.getNote(id);
    }

}
