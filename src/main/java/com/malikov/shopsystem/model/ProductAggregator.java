package com.malikov.shopsystem.model;

import com.malikov.shopsystem.enumtype.ProductAggregatorType;

import javax.persistence.*;

/**
 * @author Yurii Malikov
 */
@Entity
@Table(name = "osms_product_aggregator")
public class ProductAggregator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_aggregator_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_aggregator_type")
    private ProductAggregatorType productAggregatorType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ProductAggregatorType getProductAggregatorType() {
        return productAggregatorType;
    }

    public void setProductAggregatorType(ProductAggregatorType productAggregatorType) {
        this.productAggregatorType = productAggregatorType;
    }
}
