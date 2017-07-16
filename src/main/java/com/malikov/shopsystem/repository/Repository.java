package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.BaseEntity;

import java.util.List;

public interface Repository<T extends BaseEntity> {

    /**
     * @return persisted entity if it is new otherwise updated entity or null if not found by id
     */
    T save(T t);

    /**
     * @return true if successfully deleted, false if entity with id has not been found
     */
    boolean delete(Long id);


    /**
     * @return entity by id or null if entity with such id does not exists
     */
    T get(Long id);

    /**
     * @return all entities or empty list if not found any
     */
    List<T> getAll();
}
