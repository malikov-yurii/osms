package com.malikov.shopsystem.to;

public class OrderItemAutocompleteTo {

   // TODO: 3/25/2017    get rid of label. use javascript concatenation instead
    private String label;

    private Long productId;

    private Long productVariationId;

    private String orderItemName;

    private Integer orderItemPrice;

    public OrderItemAutocompleteTo(String label, Long productId, Long productVariationId, String orderItemName, Integer orderItemPrice) {
        this.label = label;
        this.productId = productId;
        this.productVariationId = productVariationId;
        this.orderItemName = orderItemName;
        this.orderItemPrice = orderItemPrice;
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

    public Integer getOrderItemPrice() {
        return orderItemPrice;
    }

    public void setOrderItemPrice(Integer orderItemPrice) {
        this.orderItemPrice = orderItemPrice;
    }

}
