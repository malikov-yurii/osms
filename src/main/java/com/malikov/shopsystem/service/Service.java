package com.malikov.shopsystem.service;

import java.util.List;

public interface Service<T> {

    T save(T t);

    T update(T t);

    T get(Long id);

    List<T> getAll();

    void delete(Long id);

}
