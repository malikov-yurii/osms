package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "jos_jshopping_attr_values")
@AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "value_id")),
        @AttributeOverride(name = "name", column = @Column(name = "`name_ru-RU`")),
})
public class VariationValue extends NamedEntity {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "attr_id")
    private VariationType variationType;

    public VariationValue() {
    }

    public VariationValue(VariationType variationType) {
        this.variationType = variationType;
    }

    public VariationValue(String name, VariationType variationType) {
        this.id = null;
        this.name = name;
        this.variationType = variationType;
    }

    public VariationValue(Integer id, String name, VariationType variationType) {
        super(id, name);
        this.variationType = variationType;
    }

    public VariationType getVariationType() {
        return variationType;
    }

    public void setVariationType(VariationType variationType) {
        this.variationType = variationType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VariationValue)) return false;
        if (!super.equals(o)) return false;
        VariationValue that = (VariationValue) o;
        return Objects.equals(variationType, that.variationType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), variationType);
    }

    @Override
    public String toString() {
        return "{variationValueName=" + name +
                ", type=" + variationType +
                '}';
    }
}
