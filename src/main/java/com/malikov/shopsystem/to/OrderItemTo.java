package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.io.Serializable;

public class OrderItemTo implements Serializable {

    private Integer orderItemId;

    private Integer orderProductId;

    private String name;

    private Integer price;

    private Integer quantity;

    private String supplier;

    @JsonCreator
    public OrderItemTo(
            Integer orderItemId,
            Integer orderProductId,
            String name,
            Integer price,
            Integer quantity,
            String  supplier
    ) {

        this.orderItemId = orderItemId;
        this.orderProductId = orderProductId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.supplier = supplier;
    }

    public OrderItemTo() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Integer getOrderProductId() {
        return orderProductId;
    }

    public void setOrderProductId(Integer orderProductId) {
        this.orderProductId = orderProductId;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    @Override
    public String toString() {
        return "OrderItemTo{" +
                "orderItemId=" + orderItemId +
                ", orderProductId=" + orderProductId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", supplier=" + supplier +
                '}';
    }

}
