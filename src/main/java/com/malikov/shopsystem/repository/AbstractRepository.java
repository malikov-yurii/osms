package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.BaseEntity;

import java.util.Collection;

public interface AbstractRepository<T extends BaseEntity> {

    T save(T t);

    // false if not found
    boolean delete(int id);

    // null if not found
    T get(int id);

    Collection<T> getAll();
}
