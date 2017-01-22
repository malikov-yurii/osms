package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.to.OrderItemTo;

import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

    public static Order createNewFromTo(OrderTo orderTo) {
// TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        this must work for create new order button

        return new Order(null);
    }

    public static OrderTo asTo(Order order) {

        List<OrderItemTo> OrderItemTos = order.getOrderItems()
                .stream()
                .map(oi -> new OrderItemTo(oi.getId(), oi.getProductId(), oi.getProductName(), oi.getProductPrice(), oi.getProductQuantity()))
                .collect(Collectors.toList());
        return new OrderTo(order.getId(), order.getCustomerName(), order.getCustomerLastName(),
                order.getCustomerPhoneNumber(), order.getCustomerCity(), order.getCustomerNovaPoshta(),
                order.getPaymentType(), order.getDatePlaced(), order.getStatus(), OrderItemTos);
    }

    public static Order updateFromTo(Order order, OrderTo orderTo) {
        order.setCustomerName(orderTo.getFirstName());
        order.setCustomerLastName(orderTo.getLastName());
        order.setCustomerPhoneNumber(orderTo.getPhoneNumber());
        order.setCustomerCity(orderTo.getCity());
        order.setCustomerNovaPoshta(orderTo.getNovaPoshta());
        return order;
    }
}
