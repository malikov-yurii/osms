package com.malikov.shopsystem.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Set;

public class ProductDto implements Serializable {

    private String name;
    private Set<String> categories;
    private BigDecimal price;
    private Integer quantity;
    private Boolean unlimited;
    private String supplier;
    private Boolean isAggregated;
    private String image;
    private Long id;
    private Long variationId;

    public Long getProductVariationId() {
        return variationId;
    }

    public void setProductVariationId(Long variationId) {
        this.variationId = variationId;
    }

    public Long getProductId() {
        return id;
    }

    public void setProductId(Long id) {
        this.id = id;
    }

    public Set<String> getCategories() {
        return categories;
    }

    public void setCategories(Set<String> categories) {
        this.categories = categories;
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
        this.price = price.setScale(0, RoundingMode.HALF_UP);
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isNew() {
        return variationId == null;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVariationId() {
        return variationId;
    }

    public void setVariationId(Long variationId) {
        this.variationId = variationId;
    }

    public Boolean getAggregated() {
        return isAggregated;
    }

    public void setAggregated(Boolean aggregated) {
        isAggregated = aggregated;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean isUnlimited() {
        return unlimited;
    }

    public void setUnlimited(Boolean unlimited) {
        this.unlimited = unlimited;
    }

}
