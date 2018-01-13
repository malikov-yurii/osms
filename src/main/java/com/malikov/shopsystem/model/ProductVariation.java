package com.malikov.shopsystem.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "jos_jshopping_products_attr")
@AttributeOverride(name = "id", column = @Column(name = "product_attr_id"))
public class ProductVariation extends BaseEntity {

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

    public ProductVariation() {}

    public ProductVariation(Long id, BigDecimal price, int quantity, Product product, VariationValue variationValue) {
        super(id);
        this.price = price;
        this.quantity = quantity;
        this.product = product;
        this.variationValue = variationValue;
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

    public VariationValue getVariationValue() {
        return variationValue;
    }

    public void setVariationValue(VariationValue variationValue) {
        this.variationValue = variationValue;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductAggregator getProductAggregator() {
        return productAggregator;
    }

    public void setProductAggregator(ProductAggregator productAggregator) {
        this.productAggregator = productAggregator;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductVariation)) return false;
        if (!super.equals(o)) return false;
        ProductVariation that = (ProductVariation) o;
        return price == that.price &&
                quantity == that.quantity &&
                Objects.equals(variationValue, that.variationValue);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        result = 31 * result + (variationValue != null ? variationValue.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ProductVariation{" +
                "id='" + id + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", variationValue=" + variationValue +
                '}';
    }
}
