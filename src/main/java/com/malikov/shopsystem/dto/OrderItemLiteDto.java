package com.malikov.shopsystem.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Created by Yurii_Malikov on 6/22/2017.
 */
public class OrderItemLiteDto {

    private BigDecimal price;

    private Long productId;

    private Long productVariationId;

    private String orderItemName;

    OrderItemLiteDto(){}

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price.setScale(0, RoundingMode.HALF_UP);
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
}
