package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.to.OrderTo;

public class OrderUtil {

    public static Order createNewFromTo(OrderTo orderTo) {
        // TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new Order(null);
    }

    public static OrderTo asTo(Order order) {
        // TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        StringBuilder productNamesOneLine = new StringBuilder();
        order.getProducts().forEach(product -> productNamesOneLine.append(product.getName()).append(','));
        return new OrderTo(order.getId(), order.getCustomer().getName(), order.getCustomer().getLastName(), productNamesOneLine.toString());
    }

    public static Order updateFromTo(Order order, OrderTo orderTo) {
        // TODO: 1/19/2017 implement this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return order;
    }
}
