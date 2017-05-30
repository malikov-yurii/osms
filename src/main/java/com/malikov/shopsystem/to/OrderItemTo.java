package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.io.Serializable;

//@RestResource(exported = false)
public class OrderItemTo implements Serializable {

    private Integer id;

    private Integer orderProductId;

    private String name;

    private Integer quantity;

    private Integer price;

    private String supplier;

    @JsonCreator
    public OrderItemTo(
            Integer orderItemId,
            Integer orderProductId,
            String name,
            Integer quantity,
            Integer price,
            String  supplier
    ) {

        this.id = orderItemId;
        this.orderProductId = orderProductId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
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
        return id;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.id = orderItemId;
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
                "id=" + id +
                ", orderProductId=" + orderProductId +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", supplier=" + supplier +
                '}';
    }
}
