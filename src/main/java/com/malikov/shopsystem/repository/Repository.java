package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.BaseEntity;

import java.util.List;

public interface Repository<T extends BaseEntity> {

    T save(T t);

    // false if not found
    boolean delete(int id);

    // null if not found
    T get(int id);

    List<T> getAll();
}
