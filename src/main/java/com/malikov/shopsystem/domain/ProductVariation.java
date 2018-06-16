package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.core.calculation.Exchangeable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "jos_jshopping_products_attr")
@Getter
@Setter
public class ProductVariation implements Exchangeable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_attr_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

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

    @Column(name = "weight")
    private BigDecimal weight;

    @Override
    public BigDecimal exchangeRate() {
        return getProduct().getCurrency().getCurrencyRate();
    }

    @Override
    public BigDecimal price() {
        return getPrice();
    }

}
