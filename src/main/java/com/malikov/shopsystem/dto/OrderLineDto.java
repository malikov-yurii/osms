package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.HasId;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class OrderLineDto implements Serializable, HasId {

    private Long id;
    private Long productId;
    private Long productVariationId;
    private String name;
    private Integer quantity;
    private BigDecimal price;
    private String supplier;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price.setScale(0, RoundingMode.HALF_UP);
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
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

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    @Override
    public boolean isNew() {
        return false;
    }

}
