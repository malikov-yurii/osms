package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

//@RestResource(exported = false)
public class OrderItemTo implements Serializable {

    private Integer orderItemId;

    private Integer orderProductId;

    private String name;

    private Integer price;

    private Integer quantity;

    @JsonCreator
    public OrderItemTo(
            @JsonProperty("order_item_id") Integer orderItemId,
            @JsonProperty("order_product_id") Integer orderProductId,
            @JsonProperty("name") String name,
            @JsonProperty("price") Integer price,
            @JsonProperty("quantity") Integer quantity
    ) {

        this.orderItemId = orderItemId;
        this.orderProductId = orderProductId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
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

    @Override
    public String toString() {
        return "OrderItemTo{" +
                "orderItemId=" + orderItemId +
                ", orderProductId=" + orderProductId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }
}
