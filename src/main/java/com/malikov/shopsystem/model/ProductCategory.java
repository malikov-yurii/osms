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

    public static final String DELETE = "ProductCategory.delete";
    public static final String ALL_SORTED = "ProductCategory.getAllSorted";

    public ProductCategory() {
    }

    public ProductCategory(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProductCategory(String name) {
        this(null, name);
    }

    public ProductCategory(ProductCategory pc){
        this(pc.getId(), pc.getName());
    }
}
