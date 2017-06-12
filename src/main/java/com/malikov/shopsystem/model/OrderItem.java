package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Objects;

@NamedQueries({
         @NamedQuery(name = OrderItem.DELETE, query = "DELETE FROM OrderItem oi WHERE oi.id=:id")
        ,@NamedQuery(name = OrderItem.ALL,    query = "SELECT oi FROM OrderItem oi")
})
@Entity
@Table(name = "osms_order_items")
public class OrderItem extends BaseEntity {

    public static final String DELETE = "OrderItem.delete";
    public static final String ALL = "OrderItem.getAll";

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "product_attr_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private ProductVariation productVariation;

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "product_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private Product product;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_quantity")
    private Integer productQuantity;

    public OrderItem() {
        this.productName = "";
        this.productPrice = 0;
        this.productQuantity = 1;
    }

    public OrderItem(Order order, Product product, String productName, Integer productPrice, Integer productQuantity) {
        this(product, productName, productPrice, productQuantity);
        this.order = order;
    }

    public OrderItem(Product product, String productName, Integer productPrice, Integer productQuantity) {
        this.product = product;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }

    public OrderItem(Integer orderItemId, Product product, ProductVariation productVariation, String productName, Integer productPrice, Integer productQuantity) {
        this.product = product;
        this.productVariation = productVariation;
        this.productName = productVariation != null ? productName + " " + productVariation.getVariationValue().getName() : productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
        this.id = orderItemId;
    }

    public ProductVariation getProductVariation() {
        return productVariation;
    }

    public void setProductVariation(ProductVariation productVariation) {
        this.productVariation = productVariation;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        return Objects.equals(product, orderItem.product) &&
                Objects.equals(productName, orderItem.productName) &&
                Objects.equals(productPrice, orderItem.productPrice) &&
                Objects.equals(productQuantity, orderItem.productQuantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), product, productName, productPrice, productQuantity);
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                " id=" + id +
                ", order_id=" + order.getId() +
                ", productVariation=" + productVariation +
                ", product=" + product +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productQuantity=" + productQuantity +
                '}';
    }

}
