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
                .map(oi -> new OrderItemTo(oi.getId()
                        , oi.getProduct() != null ? oi.getProduct().getId() : 0
                        , oi.getProductName()
                        , oi.getProductQuantity()
                        , oi.getProductPrice()
                        , oi.getProduct() != null ?
                                            (oi.getProduct().getSupplier() != null ? oi.getProduct().getSupplier() : "")
                                                  : ""
                ))
                .collect(Collectors.toList());
        return new OrderTo(order.getId(), order.getCustomer() != null ? order.getCustomer().getId() : 0, order.getCustomerLastName(), order.getCustomerName(),
                order.getCustomerPhoneNumber(), order.getCustomerCity(), order.getCustomerPostOffice(),
                order.getPaymentType(), order.getDatePlaced(), order.getStatus(), order.getComment() == null ? "" : order.getComment(),
                order.getTotalSum() == null ? 0 : order.getTotalSum(),
                OrderItemTos);
    }

    public static Order updateFromTo(Order order, OrderTo orderTo) {
        order.setCustomerLastName(orderTo.getLastName());
        order.setCustomerName(orderTo.getFirstName());
        order.setCustomerPhoneNumber(orderTo.getPhoneNumber());
        order.setCustomerCity(orderTo.getCity());
        order.setCustomerPostOffice(orderTo.getPostOffice());
        order.setComment(orderTo.getComment());
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
