package com.malikov.shopsystem.model;

import javax.persistence.*;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "jos_jshopping_categories")
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "`name_ru-RU`")
    private String name;

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
}
