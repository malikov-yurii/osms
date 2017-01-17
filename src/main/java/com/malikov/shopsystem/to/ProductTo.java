package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

public class ProductTo implements Serializable {

    private final Integer id;

    @NotEmpty
    private final String name;

    private final Integer price;

    private final Integer quantity;

    private final Boolean unlimited;

    private final Boolean hasVariations;

    public ProductTo(@JsonProperty("id") Integer id,
                     @JsonProperty("name") String name,
                     @JsonProperty("price") Integer price,
                     @JsonProperty("quantity") Integer quantity,
                     @JsonProperty("unlimited") Boolean unlimited,
                     @JsonProperty("hasVariations") Boolean hasVariations) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unlimited = unlimited;
        this.hasVariations = hasVariations;
    }

    public boolean isNew() {
        return id == null;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Boolean getUnlimited() {
        return unlimited;
    }

    public Boolean getHasVariations() {
        return hasVariations;
    }

    @Override
    public String toString() {
        return "ProductTo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", unlimited=" + unlimited +
                ", hasVariations=" + hasVariations +
                '}';
    }
}
