package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractOrderController {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractOrderController.class);

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;



    public OrderTo getOrderTo(int id) {
        LOG.info("get order {}", id);
        return OrderUtil.asTo(orderService.get(id));
    }

    public Order getOrder(int id) {
        LOG.info("get order {}", id);
        return orderService.get(id);
    }

    public void delete(int id) {
        LOG.info("delete order {}", id);
        orderService.delete(id);
    }

    public List<OrderTo> getAll() {
        LOG.info("getAll orders");
        return orderService.getAll().stream().map(OrderUtil::asTo).collect(Collectors.toList());
    }

    public void update(Order order, int id) {
        order.setId(id);
        LOG.info("update order{}", order);
        orderService.update(order);
    }

    public Order create(Order order) {
        order.setId(null);
        LOG.info("create order{}", order);
        return orderService.save(order);
    }

    public void changeOrderItemProductName(int itemId, String name) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductName(name);
        orderItemService.update(orderItem);
    }
    public void changeOrderItemProductPrice(int itemId, int price) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductPrice(price);
        orderItemService.update(orderItem);
    }
    public void changeOrderItemProductQuantity(int itemId, int quantity) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductQuantity(quantity);
        orderItemService.update(orderItem);
    }
}