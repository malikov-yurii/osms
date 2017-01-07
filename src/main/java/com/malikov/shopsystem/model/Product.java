package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@NamedQueries({
        @NamedQuery(name = Product.DELETE, query = "DELETE FROM Product p WHERE p.id=:id"),
        @NamedQuery(name = Product.BY_CATEGORY_ID, query =
                "SELECT p FROM Product p JOIN p.categories c WHERE c.id=:categoryId"),
        @NamedQuery(name = Product.QUANTITY_LESS_THAN, query =
                "SELECT p FROM Product p WHERE p.quantity < :quantity"),
        @NamedQuery(name = Product.ALL_SORTED, query = "SELECT p FROM Product p ORDER BY p.price"),
})
@Entity
@Table(name = "products")
public class Product extends NamedEntity {


    public static final String DELETE = "Product.delete";
    public static final String BY_CATEGORY_ID = "Product.getByCategoryId";
    public static final String QUANTITY_LESS_THAN = "Product.getQuantityLessThan";
    public static final String ALL_SORTED = "Product.getAllSorted";

    @Column(name = "price")
    private Integer price;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "products_to_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ProductCategory> categories;

    @Column(name = "different_prices")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean variationsAvailable;

    @Column(name = "unlimited")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean unlimited;

    //????????????????????  why i should replace it with bidirectional relationship
//    http://stackoverflow.com/questions/1307203/hibernate-unidirectional-one-to-many-association-why-is-a-join-table-better
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Set<ProductVariation> variations;

    public Product() {
    }

    public Product(Integer id, String name, Integer price, boolean unlimited, int quantity,
                   boolean variationsAvailable, Collection<ProductCategory> categories, Collection<ProductVariation> productVariations) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unlimited = unlimited;
        this.quantity = quantity;
        this.categories = new HashSet<>(categories);
        this.variationsAvailable = variationsAvailable;
        if (variationsAvailable)
            this.variations = new HashSet<>(productVariations);
    }

    public Product(String name, Integer price, boolean unlimited, int quantity, boolean variationsAvailable,
                   Collection<ProductCategory> categories, Collection<ProductVariation> variations) {
        this(null, name, price, unlimited, quantity, variationsAvailable, categories, variations);
    }

    public Product(Product p) {
        this(p.getId(), p.getName(), p.getPrice(), p.getUnlimited(), p.getQuantity(), p.getVariationsAvailable(),
                p.getCategories(), p.getVariations());
    }

//    private int productCode;


//    private boolean unlimited;

//    private boolean priceInEuro;


    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
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

    public Boolean getVariationsAvailable() {
        return variationsAvailable;
    }

    public void setVariationsAvailable(Boolean variationsAvailable) {
        this.variationsAvailable = variationsAvailable;
    }

    public Boolean getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(Boolean unlimited) {
        this.unlimited = unlimited;
    }

    public Set<ProductVariation> getVariations() {
        return variations;
    }

    public void setVariations(Set<ProductVariation> variations) {
        this.variations = variations;
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
                Objects.equals(variationsAvailable, product.variationsAvailable) &&
                Objects.equals(unlimited, product.unlimited) &&
                Objects.equals(variations, product.variations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), price, quantity, categories, variationsAvailable, unlimited, variations);
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", categories=" + categories +
                ", variationsAvailable=" + variationsAvailable +
                ", unlimited=" + unlimited +
                ", variations=" + variations +
                '}';
    }
}
