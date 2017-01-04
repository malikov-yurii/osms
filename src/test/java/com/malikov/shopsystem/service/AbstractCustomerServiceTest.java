package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.Customer;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static com.malikov.shopsystem.CustomerTestData.*;

public abstract class AbstractCustomerServiceTest extends AbstractServiceTest {

    @Autowired
    protected CustomerService service;

    @Test
    public void testSave() throws Exception {
        Customer newCustomer = new Customer(
                "NewName", "NewLastName", "0671234567", "newCity", "1", "new@gmail.com");
        Customer created = service.save(newCustomer);
        newCustomer.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(CUSTOMER_DROGOV, CUSTOMER_GOLOV,
                        CUSTOMER_DUNOV, newCustomer),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Customer updated = new Customer(CUSTOMER_GOLOV);
        updated.setName("Golov_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(CUSTOMER_GOLOV.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Customer customer = service.get(CUSTOMER_DUNOV.getId());
        MATCHER.assertEquals(CUSTOMER_DUNOV, customer);
    }

    @Test
    public void testGetByName() throws Exception {
        Collection<Customer> allByName = service.getByName(CUSTOMER_DROGOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DROGOV), allByName);
    }

    @Test
    public void testGetByLastName() throws Exception {
        Collection<Customer> allByLastName = service.getByLastName(CUSTOMER_GOLOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_GOLOV), allByLastName);
    }

    @Test
    public void testGetByCity() throws Exception {
        Collection<Customer> allByCity = service.getByLastName(CUSTOMER_DROGOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DROGOV), allByCity);
    }

    @Test
    public void testGetByEmail() throws Exception {
        Collection<Customer> allByEmail = service.getByLastName(CUSTOMER_DROGOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DROGOV), allByEmail);
    }

    @Test
    public void testGetByPhoneNumber() throws Exception {
        Collection<Customer> allByPhoneNumber = service.getByLastName(CUSTOMER_DUNOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DUNOV), allByPhoneNumber);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Customer> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_DROGOV, CUSTOMER_DUNOV, CUSTOMER_GOLOV), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(CUSTOMER_GOLOV.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_DUNOV, CUSTOMER_DROGOV), service.getAll());
    }
}
