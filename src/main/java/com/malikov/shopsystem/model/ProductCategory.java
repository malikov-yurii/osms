package com.malikov.shopsystem.model;

import javax.persistence.*;

@SuppressWarnings("JpaQlInspection")
@NamedQueries({
        @NamedQuery(name = ProductCategory.DELETE, query =
                "DELETE FROM ProductCategory pc WHERE pc.id=:id"),
        @NamedQuery(name = ProductCategory.ALL_SORTED, query =
                "SELECT pc FROM ProductCategory pc ORDER BY pc.name")
})
@Entity
@Table(name = "jos_jshopping_categories")
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "category_id")),
        @AttributeOverride(name = "name", column = @Column(name = "`name_ru-RU`")),
})
public class ProductCategory extends NamedEntity {

    public static final String DELETE = "ProductCategory.delete";
    public static final String ALL_SORTED = "ProductCategory.getAllSorted";


    public ProductCategory() {}

    public ProductCategory(Long id, String name) {
        this.id = id;
        this.name = name;
    }


    public ProductCategory(String name) {
        this(null, name);
    }

    public ProductCategory(ProductCategory pc) {
        this(pc.getId(), pc.getName());
    }
}
