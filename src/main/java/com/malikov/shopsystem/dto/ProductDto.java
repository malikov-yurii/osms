package com.malikov.shopsystem.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class ProductDto implements Serializable {

    private Long productId;
    private Long productVariationId;
    private String productName;
    private BigDecimal productPrice;
    private Integer productQuantity;
    private Boolean productQuantityUnlimited;
    private String productSupplier;
    private Boolean productAggregated;
    private String productImage;
    private List<String> productCategories;

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

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }

    public Boolean getProductQuantityUnlimited() {
        return productQuantityUnlimited;
    }

    public void setProductQuantityUnlimited(Boolean productQuantityUnlimited) {
        this.productQuantityUnlimited = productQuantityUnlimited;
    }

    public String getProductSupplier() {
        return productSupplier;
    }

    public void setProductSupplier(String productSupplier) {
        this.productSupplier = productSupplier;
    }

    public Boolean getProductAggregated() {
        return productAggregated;
    }

    public void setProductAggregated(Boolean productAggregated) {
        this.productAggregated = productAggregated;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public List<String> getProductCategories() {
        return productCategories;
    }

    public void setProductCategories(List<String> productCategories) {
        this.productCategories = productCategories;
    }

}
