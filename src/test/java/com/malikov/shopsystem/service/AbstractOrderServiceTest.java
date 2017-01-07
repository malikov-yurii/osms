package com.malikov.shopsystem.service;


import com.malikov.shopsystem.OrderTestData;
import com.malikov.shopsystem.model.Order;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;

import static com.malikov.shopsystem.CustomerTestData.CUSTOMER_DROGOV;
import static com.malikov.shopsystem.CustomerTestData.CUSTOMER_GOLOV;
import static com.malikov.shopsystem.OrderTestData.*;
import static com.malikov.shopsystem.ProductTestData.*;
import static com.malikov.shopsystem.UserTestData.ADMIN;

public abstract class AbstractOrderServiceTest extends AbstractServiceTest {

    @Autowired
    protected OrderService service;

    @Test
    public void testSave() throws Exception {
        Order newOrder = new Order(CUSTOMER_DROGOV, ADMIN, FERRARIO_ROZOVYJ, POTAL_KITAJ);
        Order created = service.save(newOrder);
        newOrder.setId(created.getId());
        OrderTestData.MATCHER.assertCollectionEquals(
                Arrays.asList(ORDER_1, ORDER_2, ORDER_3, ORDER_4, newOrder), service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Order updated = new Order(ORDER_1);
        updated.setProducts(new HashSet<>(Arrays.asList(POTAL_KITAJ, POTAL_NAZIONALE)));
        service.update(updated);
        OrderTestData.MATCHER.assertEquals(updated, service.get(ORDER_1.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Order order = service.get(ORDER_2.getId());
        OrderTestData.MATCHER.assertEquals(ORDER_2, order);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Order> all = service.getAll();
        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_2, ORDER_3, ORDER_4), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(ORDER_2.getId());
        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_3, ORDER_4), service.getAll());
    }

    @Test
    public void testGetByCustomerId() throws Exception {
        Collection<Order> allByCustomerId = service.getByCustomerId(CUSTOMER_GOLOV.getId());
        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_2), allByCustomerId);
    }

    @Test
    public void testGetByProductId() throws Exception {
        Collection<Order> allByProductId = service.getByProductId(POTAL_KITAJ.getId());
        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_2, ORDER_3), allByProductId);
    }
}