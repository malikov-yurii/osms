package com.malikov.shopsystem.dto;

import java.util.List;

public class OrderPage extends Page<OrderDto> {

    public OrderPage() {
    }

    public OrderPage(List<OrderDto> orderDtos, long totalOrders) {
        super(orderDtos, totalOrders);
    }

}
