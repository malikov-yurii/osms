package com.malikov.shopsystem.service;

import java.util.Collection;

public interface Service<T> {

    T save(T t);

    T update(T t);

    T get(int id);

    Collection<T> getAll();

    void delete(int id);

}
