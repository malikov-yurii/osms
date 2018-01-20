package com.malikov.shopsystem.dto;

import java.io.Serializable;

/**
 * @author Yurii Malikov
 */
public class ProductAggregatorDto implements Serializable {

    private Long id;
    private String name;
    private Integer quantity;

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
