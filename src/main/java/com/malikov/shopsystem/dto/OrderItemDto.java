package com.malikov.shopsystem.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.io.Serializable;
import java.math.BigDecimal;

public class OrderItemDto implements Serializable {

    private Long id;

    private Long orderProductId;

    private String name;

    private BigDecimal price;

    private Integer quantity;

    private String supplier;

    @JsonCreator
    public OrderItemDto(
            Long orderItemId,
            Long orderProductId,
            String name,
            BigDecimal price,
            Integer quantity,
            String  supplier
    ) {

        this.id = orderItemId;
        this.orderProductId = orderProductId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.supplier = supplier;
    }

    public OrderItemDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getOrderItemId() {
        return id;
    }

    public void setOrderItemId(Long orderItemId) {
        this.id = orderItemId;
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
        return "OrderItemDto{" +
                "id=" + id +
                ", orderProductId=" + orderProductId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", supplier=" + supplier +
                '}';
    }

}
