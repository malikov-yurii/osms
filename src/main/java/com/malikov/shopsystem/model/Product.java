package com.malikov.shopsystem.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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
    private Float price;

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

    public Product() {
    }

    public Product(Integer id, String name, Float price, int quantity, ProductCategory... categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.categories = new HashSet<>();
        Collections.addAll(this.categories, categories);
    }

    public Product(String name, Float price, int quantity, ProductCategory... categories) {
        this(null, name, price, quantity, categories);
    }

    public Product(Product p) {
        this(p.getId(), p.getName(), p.getPrice(), p.getQuantity(), p.getCategories().toArray(new ProductCategory[0]));
    }

//    private int productCode;


//    private boolean unlimited;

//    private boolean priceInEuro;


    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Set<ProductCategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ProductCategory> categories) {
        this.categories = categories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        if (!super.equals(o)) return false;

        Product product = (Product) o;

        if (Float.compare(product.price, price) != 0) return false;
        if (quantity != product.quantity) return false;
        return categories != null ? categories.equals(product.categories) : product.categories == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (price != +0.0f ? Float.floatToIntBits(price) : 0);
        result = 31 * result + quantity;
        result = 31 * result + (categories != null ? categories.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Product{" +
                "price=" + price +
                ", quantity=" + quantity +
                ", categories=" + categories +
                '}';
    }
}
