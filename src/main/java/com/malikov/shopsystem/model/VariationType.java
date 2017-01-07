package com.malikov.shopsystem.model;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "attr")
@AttributeOverride(name = "id", column = @Column(name = "attr_id"))
public class VariationType extends NamedEntity {
    public VariationType(Integer id, String name) {
        super(id, name);
    }
}
