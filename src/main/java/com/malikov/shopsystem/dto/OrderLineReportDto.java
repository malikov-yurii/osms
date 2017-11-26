package com.malikov.shopsystem.dto;

import java.math.BigDecimal;

/**
 * @author Yurii Malikov
 */
public class OrderLineReportDto {

    private Integer orderLineIndex;
    private String name;
    private Integer quantity;
    private BigDecimal itemValue;
    private BigDecimal orderLineValue;

    public OrderLineReportDto() {
    }

    public OrderLineReportDto(Integer orderLineIndex, String name, Integer quantity, BigDecimal itemValue,
                              BigDecimal orderLineValue) {
        this.orderLineIndex = orderLineIndex;
        this.name = name;
        this.quantity = quantity;
        this.itemValue = itemValue;
        this.orderLineValue = orderLineValue;
    }

    public Integer getOrderLineIndex() {
        return orderLineIndex;
    }

    public void setOrderLineIndex(Integer orderLineIndex) {
        this.orderLineIndex = orderLineIndex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getItemValue() {
        return itemValue;
    }

    public void setItemValue(BigDecimal itemValue) {
        this.itemValue = itemValue;
    }

    public BigDecimal getOrderLineValue() {
        return orderLineValue;
    }

    public void setOrderLineValue(BigDecimal orderLineValue) {
        this.orderLineValue = orderLineValue;
    }
}
