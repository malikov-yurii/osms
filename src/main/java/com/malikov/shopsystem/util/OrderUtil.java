package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderItemDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.OrderStatus;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

    public static Order updateFromTo(Order order, OrderDto orderDto) {
        order.setCustomerName(orderDto.getFirstName());
        order.setCustomerLastName(orderDto.getLastName());
        order.setCustomerPhoneNumber(orderDto.getPhoneNumber());
        order.setCustomerCity(orderDto.getCity());
        order.setCustomerPostOffice(orderDto.getPostOffice());
        order.setComment(orderDto.getComment());
        order.setTotalSum(orderDto.getTotalSum());
        return order;
    }

    public static int calculateTotalSumOfTos(Collection<OrderItemDto> orderItemDtos) {
        return orderItemDtos.stream().mapToInt(p ->
                (p.getPrice().intValue() * p.getQuantity()))
                .sum();
    }

    public static OrderDto asTo(Order order) {
        List<OrderItemDto> orderItemDtos = order.getOrderItems()
                .stream()
                .map(oi -> new OrderItemDto(oi.getId(),
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
                .collect(Collectors.toList());
        return new OrderDto(order.getId(),
                order.getCustomer() != null? order.getCustomer().getId(): 0,
                order.getCustomerName(), order.getCustomerLastName(),
                order.getCustomerPhoneNumber(), order.getCustomerCity(),
                order.getCustomerPostOffice(), order.getCustomer().getNote(), order.getPaymentType(),
                order.getDateTimePlaced(), order.getStatus(),
                order.getComment() == null ? "" : order.getComment(),
                order.getTotalSum() == null ? BigDecimal.ZERO : order.getTotalSum(),
                orderItemDtos);
    }

    public static BigDecimal calculateTotalSum(Collection<OrderItem> orderItems) {
        return orderItems.stream().
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
