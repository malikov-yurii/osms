package com.malikov.shopsystem.service;


public abstract class AbstractOrderServiceTest extends AbstractServiceTest {

//    @Autowired
//    protected OrderService service;
//
//    @Test
//    public void testSave() throws Exception {
//        Map<Product, Integer> map = new HashMap<>();
//        map.put(POTAL_NAZIONALE, 11);
//        map.put(SHELLAC_MANETTI, 88);
//        Order newOrder = new Order(CUSTOMER_DROGOV, ADMIN, PaymentType.PRIVAT_CARD, OrderStatus.READY_FOR_SHIPMENT, map);
//        Order created = service.save(newOrder);
//        newOrder.setId(created.getId());
//        OrderTestData.MATCHER.assertCollectionEquals(
//                Arrays.asList(ORDER_1, ORDER_2, ORDER_3, ORDER_4, newOrder), service.getAll());
//    }
//
//    @Test
//    public void testUpdate() throws Exception {
//        Order updated = new Order(ORDER_1);
//        Map<Product, Integer> map = new HashMap<>();
//        map.put(POTAL_KITAJ, 33);
//        map.put(FERRARIO_ROZOVYJ, 22);
//        updated.setProductQuantityMap(map);
//        service.update(updated);
//        OrderTestData.MATCHER.assertEquals(updated, service.get(ORDER_1.getId()));
//    }
//
//    @Test
//    public void testGet() throws Exception {
//        Order order = service.get(ORDER_3.getId());
//        OrderTestData.MATCHER.assertEquals(ORDER_3, order);
//    }
//
//    @Test
//    public void testGetAll() throws Exception {
//        Collection<Order> all = service.getAll();
//        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_2, ORDER_3, ORDER_4), all);
//    }
//
//    @Test
//    public void testDelete() throws Exception {
//        service.delete(ORDER_2.getId());
//        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_3, ORDER_4), service.getAll());
//    }
//
//    @Test
//    public void testGetByCustomerId() throws Exception {
//        Collection<Order> allByCustomerId = service.getByCustomerId(CUSTOMER_GOLOV.getId());
//        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_1, ORDER_2), allByCustomerId);
//    }

//    @Test
//    public void testGetByProductId() throws Exception {
//        Collection<Order> allByProductId = service.getByProductId(POTAL_KITAJ.getId());
//        OrderTestData.MATCHER.assertCollectionEquals(Arrays.asList(ORDER_2, ORDER_3), allByProductId);
//    }
}