package com.malikov.shopsystem.model;

import javax.persistence.*;


@NamedQueries({
        @NamedQuery(name = OrderItem.DELETE, query = "DELETE FROM OrderItem oi WHERE oi.id=:id"),
        @NamedQuery(name = OrderItem.ALL, query = "SELECT oi FROM OrderItem oi"),
})
@Entity
@Table(name = "order_items")
public class OrderItem extends BaseEntity {

    public static final String DELETE = "OrderItem.delete";
    public static final String ALL = "OrderItem.getAll";

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_quantity")
    private Integer productQuantity;

    public OrderItem() {
    }

    public OrderItem(Integer productId, String productName, Integer productPrice, Integer productQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }

    public OrderItem(Integer orderItemId, Integer productId, String productName, Integer productPrice, Integer productQuantity) {
        this(productId, productName, productPrice, productQuantity);
        this.id = orderItemId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Integer productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productQuantity=" + productQuantity +
                '}';
    }
}
