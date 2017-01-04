package com.malikov.shopsystem.model;


import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({
        @NamedQuery(name = ProductCategory.DELETE, query = "DELETE FROM ProductCategory pc WHERE pc.id=:id"),
        @NamedQuery(name = ProductCategory.ALL, query = "SELECT pc FROM ProductCategory pc"),
})
@Entity
@Table(name = "categories")
public class ProductCategory extends NamedEntity {

    public static final String DELETE = "Product.delete";
    public static final String ALL = "Product.getAll";
}
