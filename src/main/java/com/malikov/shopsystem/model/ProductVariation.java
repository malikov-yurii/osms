package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "products_attr")
@AttributeOverride(name = "id", column = @Column(name = "product_attr_id"))
public class ProductVariation extends BaseEntity{

    @Column(name = "price")
    private int price;

    @Column(name = "count")
    private int quantity;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attr_value_id")
    private VariationValue variationValue;

    public ProductVariation() {
    }

    public ProductVariation(int price, int quantity, VariationValue variationValue) {
        this(null, price, quantity, variationValue);
    }

    public ProductVariation(Integer id, int price, int quantity, VariationValue variationValue) {
        super(id);
        this.price = price;
        this.quantity = quantity;
        this.variationValue = variationValue;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public VariationValue getVariationValue() {
        return variationValue;
    }

    public void setVariationValue(VariationValue variationValue) {
        this.variationValue = variationValue;
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
        return Objects.hash(super.hashCode(), price, quantity, variationValue);
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
