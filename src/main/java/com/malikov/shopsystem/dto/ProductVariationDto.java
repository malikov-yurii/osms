package com.malikov.shopsystem.dto;

import java.math.BigDecimal;

/**
 * @author Yurii Malikov
 */
public class ProductVariationDto {

    private String name;

    private BigDecimal price;

    private Integer quantity;

    public ProductVariationDto() {
    }

    public ProductVariationDto(String name, BigDecimal price, Integer quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
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
}
