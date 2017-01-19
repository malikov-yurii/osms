package com.malikov.shopsystem.web.customer;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public abstract class AbstractCustomerController {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractCustomerController.class);

    @Autowired
    private CustomerService service;

    public Customer get(int id) {
        LOG.info("get order {}", id);
        return service.get(id);
    }

    public void delete(int id) {
        LOG.info("delete order {}", id);
        service.delete(id);
    }

    public List<Customer> getAll() {
        LOG.info("getAll customers");
        return service.getAll();
    }

    public void update(Customer customer, int id) {
        customer.setId(id);
        LOG.info("update order{}", customer);
        service.update(customer);
    }

    public Customer create(Customer customer) {
        customer.setId(null);
        LOG.info("create order{}", customer);
        return service.save(customer);
    }
}