package com.malikov.shopsystem.model;

import com.malikov.shopsystem.HasId;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

/**
 * This is parent class for domain classes which has ID
 *
 * @author Malikov Yurii
 * @version 0.1
 */
@MappedSuperclass
@Access(AccessType.FIELD)
public class BaseEntity implements Persistable<Long>, HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Access(value = AccessType.PROPERTY)
    protected Long id;


    public BaseEntity() {}

    protected BaseEntity(Long id) {
        this.id = id;
    }


    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean isNew() {
        return (getId() == null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || !getClass().equals(Hibernate.getClass(o))) {
            return false;
        }
        BaseEntity that = (BaseEntity) o;

        return null != getId() && getId().equals(that.getId());
    }

    @Override
    public int hashCode() {
        return (int) ((getId() == null) ? 0 : getId());
    }
}
