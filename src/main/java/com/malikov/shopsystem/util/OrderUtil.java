package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.enumtype.OrderStatus;

import java.math.BigDecimal;
import java.util.Collection;

public class OrderUtil {

    public static OrderDto asTo(Order order) {
        OrderLineDto[] orderLineDtos = order.getOrderItems()
                .stream()
                .map(oi -> new OrderLineDto(oi.getId(),
                        oi.getProduct() != null ? oi.getProduct().getId() : null,
                        oi.getProductVariation() != null ? oi.getProductVariation().getId() : null,
                        oi.getProductName(),
                        oi.getProductQuantity(),
                        oi.getProductPrice(),
                        oi.getProduct() != null
                                ? (oi.getProduct().getSupplier() != null
                                ? oi.getProduct().getSupplier()
                                : " ")
                                : ""
                ))
                .toArray(OrderLineDto[]::new);
        return new OrderDto(order.getId(),
                order.getCustomer() != null? order.getCustomer().getId(): 0,
                order.getCustomerFirstName(), order.getCustomerLastName(),
                order.getCustomerPhoneNumber(), order.getDestinationCity(),
                order.getDestinationPostOffice(),
                order.getCustomer() != null ? order.getCustomer().getNote() : null,
                order.getPaymentType(), order.getDateTimeCreated(), order.getStatus(),
                order.getComment() == null ? "" : order.getComment(),
                order.getTotalValue() == null ? BigDecimal.ZERO : order.getTotalValue(),
                orderLineDtos);
    }

    public static BigDecimal calculateTotalSum(Collection<OrderLine> orderLines) {
        return orderLines.stream().
                reduce(
                        BigDecimal.ZERO,
                        (sum, oi) -> sum.add(oi.getProductPrice().multiply(new BigDecimal(oi.getProductQuantity()))),
                        BigDecimal::add
                );
    }

    public static Integer getStatusSortOrder(OrderStatus status) {
        switch (status) {
            case OK:  return 5;
            case SHP: return 1;
            case WFP: return 2;
            case NEW: return 1;
            case NOT: return 4;
            default:  return 0;
        }
    }
}
