package com.malikov.shopsystem.core.strategy.collection;

import com.malikov.shopsystem.dto.OrderLineDto;

import java.util.List;

// TODO: 6/14/2018 use HasId interface instead of OrderLineDto, rename class
public class UpdateOrderLineStrategy implements ModifyCollectionStrategy<OrderLineDto> {

    public static final ModifyCollectionStrategy INSTANCE = new UpdateOrderLineStrategy();

    @Override
    public void execute(List<OrderLineDto> orderLines, OrderLineDto orderLine) {
        for (int i = 0; i < orderLines.size(); i++) {
            if (orderLine.getOrderLineId().equals(orderLines.get(i).getOrderLineId())) {
                orderLines.set(i, orderLine);
                break;
            }
        }
    }

}
