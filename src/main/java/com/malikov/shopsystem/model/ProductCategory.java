package com.malikov.shopsystem.model;


import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({
        @NamedQuery(name = ProductCategory.DELETE, query = "DELETE FROM ProductCategory pc WHERE pc.id=:id"),
        @NamedQuery(name = ProductCategory.ALL_SORTED, query = "SELECT pc FROM ProductCategory pc ORDER BY pc.name"),
})
@Entity
@Table(name = "categories")
public class ProductCategory extends NamedEntity {

    public static final String DELETE = "Product.delete";
    public static final String ALL_SORTED = "Product.getAllSorted";

    public ProductCategory() {
    }

    public ProductCategory(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
