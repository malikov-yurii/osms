package com.malikov.shopsystem.core.strategy.collection;

import com.malikov.shopsystem.dto.OrderLineDto;

import java.util.List;

public class AddOrderLineStrategy implements ModifyCollectionStrategy<OrderLineDto> {

    public static final ModifyCollectionStrategy INSTANCE = new AddOrderLineStrategy();

    @Override
    public void execute(List<OrderLineDto> orderLines, OrderLineDto orderLine) {
        orderLines.add(orderLine);
    }

}
