package com.malikov.shopsystem.domain;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.*;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "jos_jshopping_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "`name_ru-RU`")
    private String name;

    @Column(name = "product_price", columnDefinition = "decimal",
            precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "product_quantity")
    private Integer quantity;

    @Column(name = "discount")
    private Integer discount;

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
    private List<ProductVariation> variations;

    @Column(name = "supplier")
    private String supplier;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "currency_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private Currency currency;

    @Column(name = "image")
    private String imageFileName;

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

    public Boolean isUnlimited() {
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

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }
}
