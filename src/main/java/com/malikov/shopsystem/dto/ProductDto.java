package com.malikov.shopsystem.dto;

import java.io.Serializable;
import java.math.BigDecimal;

public class ProductDto implements Serializable {

    private Long productId;

    private Long productVariationId;

    private String name;

    private BigDecimal price;

    private Integer quantity;

    private Boolean unlimited;

    public ProductDto(
            Long productId,
            Long productVariationId,
            String name,
            BigDecimal price,
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

    public ProductDto() {
    }

    public Long getProductVariationId() {
        return productVariationId;
    }

    public void setProductVariationId(Long productVariationId) {
        this.productVariationId = productVariationId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
        return "ProductDto{" +
                "productId=" + productId +
                ", productVariationId=" + productVariationId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", unlimited=" + unlimited +
                '}';
    }

}
