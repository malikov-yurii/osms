package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

//@RestResource(exported = false)
public class ProductToForOrderTo implements Serializable {

    private String name;

    private Integer price;

    private Integer quantity;

    @JsonCreator
    public ProductToForOrderTo(
            @JsonProperty("name") String name,
            @JsonProperty("price") Integer price,
            @JsonProperty("quantity") Integer quantity
    ) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public ProductToForOrderTo() {
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

    @Override
    public String toString() {
        return "ProductTo{" +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }
}
