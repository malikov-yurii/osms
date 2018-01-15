package com.malikov.shopsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "jos_jshopping_attr_values")
public class VariationValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "value_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "`name_ru-RU`")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "attr_id")
    private VariationType variationType;

    @Column(name = "value_amount")
    private Integer valueAmount;

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

    public VariationType getVariationType() {
        return variationType;
    }

    public void setVariationType(VariationType variationType) {
        this.variationType = variationType;
    }

    public Integer getValueAmount() {
        return valueAmount;
    }

    public void setValueAmount(Integer valueAmount) {
        this.valueAmount = valueAmount;
    }

}
