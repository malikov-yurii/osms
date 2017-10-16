package com.malikov.shopsystem.model;

import com.malikov.shopsystem.enumtype.ProductAggregatorType;

import javax.persistence.*;

/**
 * @author Yurii Malikov
 */
@Entity
@Table(name = "osms_product_aggregator")
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "product_aggregator_id"))
})
public class ProductAggregator extends NamedEntity{

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_aggregator_type")
    private ProductAggregatorType productAggregatorType;

    public ProductAggregator() {
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
