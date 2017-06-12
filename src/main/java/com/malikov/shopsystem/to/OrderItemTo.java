package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.io.Serializable;

public class OrderItemTo implements Serializable {

    private Long orderItemId;

    private Long orderProductId;

    private String name;

    private Integer price;

    private Integer quantity;

    private String supplier;

    @JsonCreator
    public OrderItemTo(
            Long orderItemId,
            Long orderProductId,
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

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Long getOrderProductId() {
        return orderProductId;
    }

    public void setOrderProductId(Long orderProductId) {
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
