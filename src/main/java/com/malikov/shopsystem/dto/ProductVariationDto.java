package com.malikov.shopsystem.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * @author Yurii Malikov
 */
public class ProductVariationDto {

    private String name;
    private BigDecimal price;
    private Integer quantity;

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
        this.price = price.setScale(0, RoundingMode.HALF_UP);
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
