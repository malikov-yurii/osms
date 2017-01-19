package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.Order;
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
    private OrderService service;

    public Order get(int id) {
        LOG.info("get order {}", id);
        return service.get(id);
    }

    public void delete(int id) {
        LOG.info("delete order {}", id);
        service.delete(id);
    }

    public List<OrderTo> getAll() {
        LOG.info("getAll orders");
        return service.getAll().stream().map(OrderUtil::asTo).collect(Collectors.toList());
    }

    public void update(Order order, int id) {
        order.setId(id);
        LOG.info("update order{}", order);
        service.update(order);
    }

    public Order create(Order order) {
        order.setId(null);
        LOG.info("create order{}", order);
        return service.save(order);
    }
}