package com.malikov.shopsystem.model;

import javax.persistence.*;

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

        if (price != that.price) return false;
        if (quantity != that.quantity) return false;
        return variationValue != null ? variationValue.equals(that.variationValue) : that.variationValue == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + price;
        result = 31 * result + quantity;
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
