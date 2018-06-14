package com.malikov.shopsystem.core.strategy.collection;

import com.malikov.shopsystem.dto.OrderLineDto;

import java.util.Iterator;
import java.util.List;

public class DeleteOrderLineStrategy implements ModifyCollectionStrategy<OrderLineDto> {

    public static final ModifyCollectionStrategy INSTANCE = new DeleteOrderLineStrategy();

    @Override
    public void execute(List<OrderLineDto> orderLines, OrderLineDto orderLine) {
        Iterator<OrderLineDto> iterator = orderLines.iterator();
        while (iterator.hasNext()) {
            OrderLineDto nextOrderLine = iterator.next();
            if (nextOrderLine.getOrderLineId().equals(orderLine.getOrderLineId())) {
                iterator.remove();
                break;
            }
        }
    }

}
