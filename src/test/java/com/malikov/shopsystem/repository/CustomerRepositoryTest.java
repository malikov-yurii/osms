package com.malikov.shopsystem.repository;

public abstract class CustomerRepositoryTest extends AbstractRepositoryTest {
/*
    @Autowired
    protected CustomerService service;

    @Test
    public void testSave() throws Exception {
        Customer newCustomer = new Customer(
                "NewName", "NewLastName", "0671234567", "newCity", "1", "new@gmail.com", "");
        Customer created = service.create(newCustomer);
        newCustomer.setCustomerId(created.getCustomerId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(CUSTOMER_DROGOV, CUSTOMER_GOLOV, CUSTOMER_DUNOV,
                        CUSTOMER_WITHOUT_ANY_ORDER, newCustomer), service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Customer updated = new Customer(CUSTOMER_GOLOV);
        updated.setName("Golov_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(CUSTOMER_GOLOV.getCustomerId()));
    }

    @Test
    public void testGet() throws Exception {
        Customer customer = service.get(CUSTOMER_DUNOV.getCustomerId());
        MATCHER.assertEquals(CUSTOMER_DUNOV, customer);
    }

    @Test
    public void testGetByName() throws Exception {
        Collection<Customer> allByName = service.getByName(CUSTOMER_DROGOV.getName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DROGOV), allByName);
    }

    @Test
    public void testGetByLastName() throws Exception {
        Collection<Customer> allByLastName = service.getByLastName(CUSTOMER_GOLOV.getLastName());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_GOLOV), allByLastName);
    }

    @Test
    public void testGetByCity() throws Exception {
        Collection<Customer> allByCity = service.getByCity(CUSTOMER_DROGOV.getCity());
        MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_DROGOV), allByCity);
    }

    @Test
    public void testGetByEmail() throws Exception {
        Customer customer = service.getByEmail(CUSTOMER_DROGOV.getEmail());
        MATCHER.assertEquals(CUSTOMER_DROGOV, customer);
    }

    @Test
    public void testGetByPhoneNumber() throws Exception {
        Customer customer = service.getByPhoneNumber(CUSTOMER_DUNOV.getPhoneNumber());
        MATCHER.assertEquals(CUSTOMER_DUNOV, customer);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Customer> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_DROGOV,
                CUSTOMER_GOLOV, CUSTOMER_DUNOV, CUSTOMER_WITHOUT_ANY_ORDER), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(CUSTOMER_WITHOUT_ANY_ORDER.getCustomerId());
        MATCHER.assertCollectionEquals(Arrays.asList(CUSTOMER_DROGOV, CUSTOMER_GOLOV, CUSTOMER_DUNOV), service.getAll());
    }
 */
}
