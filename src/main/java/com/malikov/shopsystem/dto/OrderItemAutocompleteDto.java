package com.malikov.shopsystem.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class OrderItemAutocompleteDto {

   // TODO: 3/25/2017    get rid of label. use javascript concatenation instead
    private String label;

    private Long orderProductId;

    private Long productVariationId;

    private String name;

    private BigDecimal price;

    public OrderItemAutocompleteDto(String label, Long orderProductId, Long productVariationId, String name, BigDecimal price) {
        this.label = label;
        this.orderProductId = orderProductId;
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
        return orderProductId;
    }

    public void setProductId(Long orderProductId) {
        this.orderProductId = orderProductId;
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
