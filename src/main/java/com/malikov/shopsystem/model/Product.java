package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
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

    @ManyToMany
    @Fetch(FetchMode.JOIN)
    @JoinTable(
            name = "products_to_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ProductCategory> categories;

    //  1 - true (should replace with boolean after testing)
//  0 - false
    @Column(name = "different_prices")
    private int variationsAvailable;

    //  1 - true (should replace with boolean after testing)
//  0 - false
    @Column(name = "unlimited")
    private int unlimited;

    //????????????????????  why i should replace it with bidirectional relationship
//    http://stackoverflow.com/questions/1307203/hibernate-unidirectional-one-to-many-association-why-is-a-join-table-better
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Set<ProductVariation> variations;

    public Product() {
    }

    public Product(Integer id, String name, Integer price, int unlimited, int quantity,
                   Integer variationsAvailable, Collection<ProductCategory> categories, Collection<ProductVariation> productVariations) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unlimited = unlimited;
        this.quantity = quantity;
        this.categories = new HashSet<>(categories);
        this.variationsAvailable = variationsAvailable;
        if (variationsAvailable == 1)
            this.variations = new HashSet<>(productVariations);
    }

    public Product(String name, Integer price, int unlimited, int quantity, int variationsAvailable,
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

    public int getVariationsAvailable() {
        return variationsAvailable;
    }

    public void setVariationsAvailable(int variationsAvailable) {
        this.variationsAvailable = variationsAvailable;
    }

    public int getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(int unlimited) {
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

        if (variationsAvailable != product.variationsAvailable) return false;
        if (unlimited != product.unlimited) return false;
        if (price != null ? !price.equals(product.price) : product.price != null) return false;
        if (quantity != null ? !quantity.equals(product.quantity) : product.quantity != null) return false;
        if (categories != null ? !categories.equals(product.categories) : product.categories != null) return false;
        return variations != null ? variations.equals(product.variations) : product.variations == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        result = 31 * result + (categories != null ? categories.hashCode() : 0);
        result = 31 * result + variationsAvailable;
        result = 31 * result + unlimited;
        result = 31 * result + (variations != null ? variations.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Product{" +
                "price=" + price +
                ", quantity=" + quantity +
                ", categories=" + categories +
                ", variationsAvailable=" + variationsAvailable +
                ", unlimited=" + unlimited +
                ", variations=" + variations +
                '}';
    }
}
