package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_order_items")
public class OrderItem extends BaseEntity {

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
    private BigDecimal productPrice;

    @Column(name = "product_quantity")
    private Integer productQuantity;


    public OrderItem() {
        this.productName = "";
        this.productPrice = new BigDecimal(0);
        this.productQuantity = 1;
    }

    public OrderItem(Order order, Product product, String productName,
                     BigDecimal productPrice, Integer productQuantity) {
        this(null, product, null, productName, productPrice, productQuantity);
        this.order = order;
    }

    public OrderItem(Long id, Product product,
                     ProductVariation variation, String productName,
                     BigDecimal productPrice, Integer productQuantity) {
        this.product = product;
        this.productVariation = variation;
        this.productName = variation != null
                ? productName + " " + variation.getVariationValue().getName()
                : productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
        this.id = id;
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
        return Objects.hash(super.hashCode(), product, productName,
                productPrice, productQuantity);
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
