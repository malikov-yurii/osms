package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Objects;


@NamedQueries({
        @NamedQuery(name = OrderItem.DELETE, query = "DELETE FROM OrderItem oi WHERE oi.id=:id"),
        @NamedQuery(name = OrderItem.ALL, query = "SELECT oi FROM OrderItem oi"),
})
@Entity
@Table(name = "order_items")
public class OrderItem extends BaseEntity {

    public static final String DELETE = "OrderItemExtended.delete";
    public static final String ALL = "OrderItemExtended.getAll";

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "product_attr_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private ProductVariation productVariation;

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

    public OrderItem(Order order, Integer productId, String productName, Integer productPrice, Integer productQuantity) {
        this(productId, productName, productPrice, productQuantity);
        this.order = order;
    }

    public OrderItem(Integer productId, String productName, Integer productPrice, Integer productQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }

    public OrderItem(Integer orderItemId, Integer productId, ProductVariation productVariation, String productName, Integer productPrice, Integer productQuantity) {
        this(productId, productName, productPrice, productQuantity);
        this.id = orderItemId;
        this.productVariation = productVariation;
    }

    public ProductVariation getProductVariation() {
        return productVariation;
    }

    public void setProductVariation(ProductVariation productVariation) {
        this.productVariation = productVariation;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItem)) return false;
        if (!super.equals(o)) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(productId, orderItem.productId) &&
                Objects.equals(productName, orderItem.productName) &&
                Objects.equals(productPrice, orderItem.productPrice) &&
                Objects.equals(productQuantity, orderItem.productQuantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), productId, productName, productPrice, productQuantity);
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                " id=" + id +
                ", order_id=" + order.getId() +
                ", productVariation=" + productVariation +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productQuantity=" + productQuantity +
                '}';
    }
}
