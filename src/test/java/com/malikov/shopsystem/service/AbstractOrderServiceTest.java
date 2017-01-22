package com.malikov.shopsystem.service;


import com.malikov.shopsystem.OrderTestData;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;

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
        Order newOrder = new Order(CUSTOMER_DROGOV, ADMIN,
                PaymentType.PRIVAT_CARD,
                OrderStatus.READY_FOR_SHIPMENT,
                Arrays.asList(
                        new OrderItem(11, FERRARIO_ROZOVYJ.getId(), FERRARIO_ROZOVYJ.getName(), FERRARIO_ROZOVYJ.getPrice(), 7),
                        new OrderItem(12, POTAL_NAZIONALE.getId(), POTAL_NAZIONALE.getName(), POTAL_NAZIONALE.getPrice(), 6),
                        new OrderItem(13, SHELLAC_MANETTI.getId(), SHELLAC_MANETTI.getName(), SHELLAC_MANETTI.getPrice(), 8)
                ));
        Order created = service.save(newOrder);
        newOrder.setId(created.getId());
        OrderTestData.MATCHER.assertCollectionEquals(
                Arrays.asList(ORDER_1, ORDER_2, ORDER_3, ORDER_4, newOrder), service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Order updated = new Order(ORDER_1);
        updated.setOrderItems(
                Arrays.asList(
                        new OrderItem(9, POTAL_KITAJ.getId(), POTAL_KITAJ.getName(), POTAL_KITAJ.getPrice(), 33),
                        new OrderItem(10, FERRARIO_ROZOVYJ.getId(), FERRARIO_ROZOVYJ.getName(), FERRARIO_ROZOVYJ.getPrice(), 22)
                )
        );
        service.update(updated);
        OrderTestData.MATCHER.assertEquals(updated, service.get(ORDER_1.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Order order = service.get(ORDER_3.getId());
        OrderTestData.MATCHER.assertEquals(ORDER_3, order);
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

//    @Test
//    public void testGetByProductId() throws Exception {
//        Collection<Order> allByProductId = service.getByProductId(POTAL_KITAJ.getId());
//        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_2, ORDER_3), allByProductId);
//    }
}