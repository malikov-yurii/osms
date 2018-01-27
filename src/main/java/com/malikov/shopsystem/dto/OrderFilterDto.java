package com.malikov.shopsystem.dto;

import java.time.LocalDateTime;

/**
 * @author Yurii Malikov
 */
public class OrderFilterDto {

    private Long customerId;
    private String customerFirstNameMask;
    private String customerLastNameMask;
    private String destinationCityMask;
    private String customerPhoneMask;
    private Long productId;
    private Long productVariationId;
    private String productNameMask;
    private LocalDateTime fromDateTimeCreated;
    private LocalDateTime toDateTimeCreated;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerFirstNameMask() {
        return customerFirstNameMask;
    }

    public void setCustomerFirstNameMask(String customerFirstNameMask) {
        this.customerFirstNameMask = customerFirstNameMask;
    }

    public String getCustomerLastNameMask() {
        return customerLastNameMask;
    }

    public void setCustomerLastNameMask(String customerLastNameMask) {
        this.customerLastNameMask = customerLastNameMask;
    }

    public String getDestinationCityMask() {
        return destinationCityMask;
    }

    public void setDestinationCityMask(String destinationCityMask) {
        this.destinationCityMask = destinationCityMask;
    }

    public String getCustomerPhoneMask() {
        return customerPhoneMask;
    }

    public void setCustomerPhoneMask(String customerPhoneMask) {
        this.customerPhoneMask = customerPhoneMask;
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

    public String getProductNameMask() {
        return productNameMask;
    }

    public void setProductNameMask(String productNameMask) {
        this.productNameMask = productNameMask;
    }

    public LocalDateTime getFromDateTimeCreated() {
        return fromDateTimeCreated;
    }

    public void setFromDateTimeCreated(LocalDateTime fromDateTimeCreated) {
        this.fromDateTimeCreated = fromDateTimeCreated;
    }

    public LocalDateTime getToDateTimeCreated() {
        return toDateTimeCreated;
    }

    public void setToDateTimeCreated(LocalDateTime toDateTimeCreated) {
        this.toDateTimeCreated = toDateTimeCreated;
    }

}
