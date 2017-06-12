package com.malikov.shopsystem.to;

import java.io.Serializable;

public class ProductTo implements Serializable {

    private Integer productId;

    private Integer productVariationId;

    private String name;

    private Integer price;

    private Integer quantity;

    private Boolean unlimited;

    public ProductTo(
            Integer productId,
            Integer productVariationId,
            String name,
            Integer price,
            Integer quantity,
            Boolean unlimited
    ) {
        this.productId = productId;
        this.productVariationId = productVariationId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unlimited = unlimited;
    }

    public ProductTo() {
    }

    public Integer getProductVariationId() {
        return productVariationId;
    }

    public void setProductVariationId(Integer productVariationId) {
        this.productVariationId = productVariationId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
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
        return productVariationId == null;
    }

    public Boolean getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(Boolean unlimited) {
        this.unlimited = unlimited;
    }

    @Override
    public String toString() {
        return "ProductTo{" +
                "productId=" + productId +
                ", productVariationId=" + productVariationId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", unlimited=" + unlimited +
                '}';
    }

}
