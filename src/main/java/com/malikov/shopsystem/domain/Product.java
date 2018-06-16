package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.core.calculation.Exchangeable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Type;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "jos_jshopping_products")
@Getter
@Setter
public class Product implements Exchangeable {

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

    @Column(name = "product_weight")
    private BigDecimal weight;

    @Override
    public BigDecimal exchangeRate() {
        Currency currency = getCurrency();
        return Objects.nonNull(currency) ? currency.getCurrencyRate() : BigDecimal.ONE;
    }

    @Override
    public BigDecimal price() {
        return getPrice();
    }

}
