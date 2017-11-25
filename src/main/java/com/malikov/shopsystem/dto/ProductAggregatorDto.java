package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.model.ProductAggregator;

import java.io.Serializable;

/**
 * @author Yurii Malikov
 */
public class ProductAggregatorDto implements Serializable {

    private Long id;
    private String name;
    private Integer quantity;

    public ProductAggregatorDto(Long id, String name, Integer quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    public ProductAggregatorDto() {
    }

    public ProductAggregatorDto(ProductAggregator productAggregator) {
        this.id = productAggregator.getId();
        this.name = productAggregator.getName();
        this.quantity = productAggregator.getQuantity();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
