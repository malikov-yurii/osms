package com.malikov.shopsystem.core.calculation;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;

public class ValueCalculatorTest {

    private static final long FIRST_ORDER_LINE_PRODUCT_PRICE = 10L;
    private static final long SECOND_ORDER_LINE_PRODUCT_PRICE = 20L;
    private static final int FIRST_ORDER_LINE_PRODUCT_QUANTITY = 11;
    private static final int SECOND_ORDER_LINE_PRODUCT_QUANTITY = 22;

    @Test
    public void shouldCalculateTotalOrderValue() throws Exception {
        Order order = prepareOrder(FIRST_ORDER_LINE_PRODUCT_PRICE, FIRST_ORDER_LINE_PRODUCT_QUANTITY,
                SECOND_ORDER_LINE_PRODUCT_PRICE, SECOND_ORDER_LINE_PRODUCT_QUANTITY);

        BigDecimal actualOrderValue = ValueCalculator.calculateValue(order);

        BigDecimal expectedOrderValue = BigDecimal.valueOf(
                FIRST_ORDER_LINE_PRODUCT_PRICE * FIRST_ORDER_LINE_PRODUCT_QUANTITY
                + SECOND_ORDER_LINE_PRODUCT_PRICE * SECOND_ORDER_LINE_PRODUCT_QUANTITY);
        assertThat(actualOrderValue).isEqualTo(expectedOrderValue);
    }

    private Order prepareOrder(long firstOrderLineProductPrice, int firstOrderLineProductQuantity,
                               long secondOrderLineProductPrice, int secondOrderLineProductQuantity) {
        Order order = new Order();
        OrderLine firstOrderLine = new OrderLine();
        firstOrderLine.setProductPrice(BigDecimal.valueOf(firstOrderLineProductPrice));
        firstOrderLine.setProductQuantity(firstOrderLineProductQuantity);
        OrderLine secondOrderLine = new OrderLine();
        secondOrderLine.setProductPrice(BigDecimal.valueOf(secondOrderLineProductPrice));
        secondOrderLine.setProductQuantity(secondOrderLineProductQuantity);
        List<OrderLine> orderLines = Arrays.asList(firstOrderLine, secondOrderLine);
        order.setOrderLines(orderLines);
        return order;
    }

} 
