package com.malikov.shopsystem.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.math.BigDecimal;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "jos_jshopping_products_attr")
public class ProductVariation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_attr_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "count")
    private Integer quantity;

    @Column(name = "discount")
    private Integer discount;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "attr_value_id")
    private VariationValue variationValue;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_aggregator_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private ProductAggregator productAggregator;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public VariationValue getVariationValue() {
        return variationValue;
    }

    public void setVariationValue(VariationValue variationValue) {
        this.variationValue = variationValue;
    }

    public ProductAggregator getProductAggregator() {
        return productAggregator;
    }

    public void setProductAggregator(ProductAggregator productAggregator) {
        this.productAggregator = productAggregator;
    }
}
