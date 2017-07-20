package com.malikov.shopsystem.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class OrderItemAutocompleteDto {

   // TODO: 3/25/2017    get rid of label. use javascript concatenation instead
    private String label;

    private Long productId;

    private Long productVariationId;

    private String orderItemName;

    private BigDecimal orderItemPrice;

    public OrderItemAutocompleteDto(String label, Long productId, Long productVariationId, String orderItemName, BigDecimal orderItemPrice) {
        this.label = label;
        this.productId = productId;
        this.productVariationId = productVariationId;
        this.orderItemName = orderItemName;
        this.orderItemPrice = orderItemPrice.setScale(0, RoundingMode.HALF_UP);
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
        return orderItemName;
    }

    public void setOrderItemName(String orderItemName) {
        this.orderItemName = orderItemName;
    }

    public BigDecimal getOrderItemPrice() {
        return orderItemPrice;
    }

    public void setOrderItemPrice(BigDecimal orderItemPrice) {
        this.orderItemPrice = orderItemPrice.setScale(0, RoundingMode.HALF_UP);
    }
}
