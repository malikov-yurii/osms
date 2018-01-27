package com.malikov.shopsystem.domain;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "osms_order_items")
public class OrderLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
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
    private BigDecimal productPrice = BigDecimal.ZERO;

    @Column(name = "product_quantity")
    private Integer productQuantity = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
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
}
