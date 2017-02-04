package com.malikov.shopsystem.to;

public class OrderItemAutocompleteTo {

    private String orderItemName;

    private Integer orderItemPrice;

    public OrderItemAutocompleteTo(String orderItemName, Integer orderItemPrice) {
        this.orderItemName = orderItemName;
        this.orderItemPrice = orderItemPrice;
    }

    public String getOrderItemName() {
        return orderItemName;
    }

    public void setOrderItemName(String orderItemName) {
        this.orderItemName = orderItemName;
    }

    public Integer getOrderItemPrice() {
        return orderItemPrice;
    }

    public void setOrderItemPrice(Integer orderItemPrice) {
        this.orderItemPrice = orderItemPrice;
    }
}
