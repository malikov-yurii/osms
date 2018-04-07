package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.enumtype.ProductAggregatorType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "osms_product_aggregator")
@Getter
@Setter
public class ProductAggregator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_aggregator_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_aggregator_type")
    private ProductAggregatorType productAggregatorType;

}
