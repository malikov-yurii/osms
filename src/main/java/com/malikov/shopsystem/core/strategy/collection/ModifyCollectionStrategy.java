package com.malikov.shopsystem.core.strategy.collection;

import java.util.List;

public interface ModifyCollectionStrategy<T> {

    void execute(List<T> elements, T element);

}
