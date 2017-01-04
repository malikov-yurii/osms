package com.malikov.shopsystem.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.com.malikov.model.Customer;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static ua.com.malikov.CustomerTestData.*;
import static ua.com.malikov.CustomerTestData.MATCHER;

public abstract class AbstractCustomerServiceTest extends AbstractServiceTest {

    @Autowired
    protected CustomerService service;

    @Test
    public void testAdd() throws Exception {
        Customer newCustomer = new Customer("newCustomer");
        Customer created = service.save(newCustomer);
        newCustomer.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(CUSTOMER_CITI_BANK, CUSTOMER_ROZETKA,
                        CUSTOMER_UKRZALIZNYTSYA, newCustomer),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Customer updated = new Customer(CUSTOMER_ROZETKA);
        updated.setName("ROZETKA_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(CUSTOMER_ROZETKA.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Customer customer = service.get(CUSTOMER_UKRZALIZNYTSYA.getId());
        MATCHER.assertEquals(CUSTOMER_UKRZALIZNYTSYA, customer);
    }

    @Test
    public void testGetByName() throws Exception {
        Customer customer = service.get(CUSTOMER_CITI_BANK.getName());
        MATCHER.assertEquals(CUSTOMER_CITI_BANK, customer);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Customer> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_CITI_BANK, CUSTOMER_ROZETKA, CUSTOMER_UKRZALIZNYTSYA), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(CUSTOMER_UKRZALIZNYTSYA.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_CITI_BANK, CUSTOMER_ROZETKA), service.getAll());
    }

    @Test
    public void testDeleteAll() throws Exception {
        service.deleteAll();
        MATCHER.assertCollectionEquals(Collections.EMPTY_LIST, service.getAll());
    }
}
