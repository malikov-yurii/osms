package com.malikov.shopsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "jos_jshopping_attr")
@AttributeOverrides({
         @AttributeOverride(name = "id", column = @Column(name = "attr_id"))
        ,@AttributeOverride(name = "name", column = @Column(name = "`name_ru-RU`")),
})
public class VariationType extends NamedEntity {

    public VariationType(Integer id, String name) {
        super(id, name);
    }

    public VariationType() {
    }

    @Override
    public String toString() {
        return name;
    }

}
