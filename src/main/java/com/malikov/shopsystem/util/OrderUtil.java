package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.to.ProductToForOrderTo;

import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

    public static Order createNewFromTo(OrderTo orderTo) {
        // TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new Order(null);
    }

    public static OrderTo asTo(Order order) {
//        List<ProductToForOrderTo> productsToForOrderTo = new ArrayList<>();
//        for (Map.Entry<Product, Integer> entry : order.getProductQuantityMap().entrySet()){
//            productsToForOrderTo.add(new ProductToForOrderTo(entry.getKey().getName(), entry.getKey().getPrice(), entry.getValue()));
//        }
        List<ProductToForOrderTo> productsToForOrderTo =
                order.getProductQuantityMap()
                        .entrySet()
                        .stream()
                        .map(e -> new ProductToForOrderTo(e.getKey().getName(), e.getKey().getPrice(), e.getValue()))
                        .collect(Collectors.toList());
        return new OrderTo(order.getId(), order.getCustomer().getName(), order.getCustomer().getLastName(),
                order.getCustomer().getPhoneNumber(), order.getCustomer().getCity(), order.getCustomer().getNovaPoshta(),
                order.getPaymentType(), order.getDatePlaced(), order.getStatus(), productsToForOrderTo);
    }

    public static Order updateFromTo(Order order, OrderTo orderTo) {
        // TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return order;
    }
}
