package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.to.OrderItemTo;
import com.malikov.shopsystem.to.OrderTo;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

    public static OrderTo asTo(Order order) {

        List<OrderItemTo> OrderItemTos = order.getOrderItems()
                .stream()
                .map(oi -> new OrderItemTo(oi.getId(), oi.getProductId(), oi.getProductName(), oi.getProductPrice(), oi.getProductQuantity()))
                .collect(Collectors.toList());
        return new OrderTo(order.getId(), order.getCustomer() != null ? order.getCustomer().getId() : 0, order.getCustomerName(), order.getCustomerLastName(),
                order.getCustomerPhoneNumber(), order.getCustomerCity(), order.getCustomerPostOffice(),
                order.getPaymentType(), order.getDatePlaced(), order.getStatus(), OrderItemTos);
    }

    public static Order updateFromTo(Order order, OrderTo orderTo) {
        order.setCustomerName(orderTo.getFirstName());
        order.setCustomerLastName(orderTo.getLastName());
        order.setCustomerPhoneNumber(orderTo.getPhoneNumber());
        order.setCustomerCity(orderTo.getCity());
        order.setCustomerPostOffice(orderTo.getPostOffice());
        order.setTotalSum(orderTo.getTotalSum());
        return order;
    }

    public static int calculateTotalSumOfTos(Collection<OrderItemTo> orderItemTos){
        return orderItemTos.stream().mapToInt(p -> (p.getPrice() * p.getQuantity())).sum();
    }

    public static int calculateTotalSum(Collection<OrderItem> orderItems){
        return orderItems.stream().mapToInt(p -> (p.getProductPrice() * p.getProductQuantity())).sum();
    }
}
