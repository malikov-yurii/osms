package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "jos_jshopping_products")
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "product_id")),
        @AttributeOverride(name = "name", column = @Column(name = "`name_ru-RU`")),
})
public class Product extends NamedEntity {

    @Column(name = "product_price", columnDefinition = "decimal",
            precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "product_quantity")
    private Integer quantity;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "jos_jshopping_products_to_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ProductCategory> categories;

    @Column(name = "different_prices")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean hasVariations;

    @Column(name = "unlimited")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean unlimited;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "product")
    @Fetch(FetchMode.SELECT)
    @OrderBy("id ASC")
    //@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    //@Fetch(FetchMode.SELECT)
    //@JoinColumn(name = "product_id")
    //@OrderBy("id ASC")
    private List<ProductVariation> variations;

    @Column(name = "supplier")
    private String supplier;

    public Product() {}

    public Product(Long id, String name, BigDecimal price, boolean unlimited,
                   int quantity, boolean hasVariations,
                   Collection<ProductCategory> categories) {
        super(id, name);
        this.price = price;
        this.unlimited = unlimited;
        this.quantity = quantity;
        this.categories = new HashSet<>(categories);
        this.hasVariations = hasVariations;
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

    public Set<ProductCategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ProductCategory> categories) {
        this.categories = categories;
    }

    public Boolean getHasVariations() {
        return hasVariations;
    }

    public void setHasVariations(Boolean hasVariations) {
        this.hasVariations = hasVariations;
    }

    public Boolean getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(Boolean unlimited) {
        this.unlimited = unlimited;
    }

    public List<ProductVariation> getVariations() {
        return variations;
    }

    public void setVariations(List<ProductVariation> variations) {
        this.variations = variations;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        if (!super.equals(o)) return false;
        Product product = (Product) o;
        return Objects.equals(price, product.price) &&
                Objects.equals(quantity, product.quantity) &&
                Objects.equals(categories, product.categories) &&
                Objects.equals(hasVariations, product.hasVariations) &&
                Objects.equals(unlimited, product.unlimited) &&
                Objects.equals(supplier, product.supplier) &&
                Objects.equals(variations, product.variations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), price, quantity, categories,
                hasVariations, unlimited, variations);
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", categories=" + categories +
                ", hasVariations=" + hasVariations +
                ", unlimited=" + unlimited +
                ", supplier=" + supplier +
                ", variations=" + variations +
                '}';
    }
}
