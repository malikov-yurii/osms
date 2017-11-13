package com.malikov.shopsystem.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class ProductAutocompleteDto {

    private String label;

    private Long productId;

    private Long productVariationId;

    private String name;

    private BigDecimal price;

    public ProductAutocompleteDto(String label, Long productId, Long productVariationId, String name, BigDecimal price) {
        this.label = label;
        this.productId = productId;
        this.productVariationId = productVariationId;
        this.name = name;
        this.price = price.setScale(0, RoundingMode.HALF_UP);
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductVariationId() {
        return productVariationId;
    }

    public void setProductVariationId(Long productVariationId) {
        this.productVariationId = productVariationId;
    }

    public String getOrderItemName() {
        return name;
    }

    public void setOrderItemName(String name) {
        this.name = name;
    }

    public BigDecimal getOrderItemPrice() {
        return price;
    }

    public void setOrderItemPrice(BigDecimal price) {
        this.price = price.setScale(0, RoundingMode.HALF_UP);
    }
}
