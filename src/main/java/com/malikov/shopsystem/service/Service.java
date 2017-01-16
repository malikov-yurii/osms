package com.malikov.shopsystem.service;

import java.util.List;

public interface Service<T> {

    T save(T t);

    T update(T t);

    T get(int id);

    List<T> getAll();

    void delete(int id);

}
