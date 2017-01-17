package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ProductTo implements Serializable {

    private Integer id;

    private String name;

    private Integer price;

    private Integer quantity;

//    private Boolean unlimited;
//
//    private Boolean hasVariations;

    public ProductTo(@JsonProperty("id") Integer id,
                     @JsonProperty("name") String name,
                     @JsonProperty("price") Integer price,
                     @JsonProperty("quantity") Integer quantity
//            , @JsonProperty("unlimited") Boolean unlimited,
//                     @JsonProperty("hasVariations") Boolean hasVariations
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
//        this.unlimited = unlimited;
//        this.hasVariations = hasVariations;
    }

    public ProductTo() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public boolean isNew() {
        return id == null;
    }

    //    public Boolean getUnlimited() {
//        return unlimited;
//    }
//
//    public void setUnlimited(Boolean unlimited) {
//        this.unlimited = unlimited;
//    }
//
//    public Boolean getHasVariations() {
//        return hasVariations;
//    }
//
//    public void setHasVariations(Boolean hasVariations) {
//        this.hasVariations = hasVariations;
//    }

    @Override
    public String toString() {
        return "ProductTo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
//                ", unlimited=" + unlimited +
//                ", hasVariations=" + hasVariations +
                '}';
    }
}
