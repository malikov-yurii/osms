package com.malikov.shopsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "attr_values")
@AttributeOverride(name = "id", column = @Column(name = "value_id"))
public class VariationValue extends NamedEntity {

    @ManyToOne(cascade = CascadeType.ALL)
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

        return variationType != null ? variationType.equals(that.variationType) : that.variationType == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (variationType != null ? variationType.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "VariationValue{" +
                "variationType=" + variationType +
                '}';
    }
}
