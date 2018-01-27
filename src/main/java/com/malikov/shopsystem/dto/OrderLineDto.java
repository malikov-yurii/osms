package com.malikov.shopsystem.dto;

import java.io.Serializable;
import java.math.BigDecimal;

public class OrderLineDto implements Serializable {

    private Long orderLineId;
    private Long productId;
    private Long productVariationId;
    private String orderLineProductName;
    private Integer orderLineProductQuantity;
    private BigDecimal orderLineProductPrice;
    private String supplier;

    public Long getOrderLineId() {
        return orderLineId;
    }

    public void setOrderLineId(Long orderLineId) {
        this.orderLineId = orderLineId;
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

    public String getOrderLineProductName() {
        return orderLineProductName;
    }

    public void setOrderLineProductName(String orderLineProductName) {
        this.orderLineProductName = orderLineProductName;
    }

    public Integer getOrderLineProductQuantity() {
        return orderLineProductQuantity;
    }

    public void setOrderLineProductQuantity(Integer orderLineProductQuantity) {
        this.orderLineProductQuantity = orderLineProductQuantity;
    }

    public BigDecimal getOrderLineProductPrice() {
        return orderLineProductPrice;
    }

    public void setOrderLineProductPrice(BigDecimal orderLineProductPrice) {
        this.orderLineProductPrice = orderLineProductPrice;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

}
