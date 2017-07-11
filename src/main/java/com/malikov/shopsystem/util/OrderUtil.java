package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.OrderItemDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.dto.OrderDto;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

  public static OrderDto asTo(Order order) {
    List<OrderItemDto> orderItemDtos = order.getOrderItems()
        .stream()
        .map(oi -> new OrderItemDto(oi.getId(),
            oi.getProduct() != null ? oi.getProduct().getId() : 0,
            oi.getProductName(),
            oi.getProductPrice(),
            oi.getProductQuantity(),
            oi.getProduct() != null
                ? (oi.getProduct().getSupplier() != null
                ? oi.getProduct().getSupplier()
                : "")
                : ""
        ))
        .collect(Collectors.toList());

    return new OrderDto(order.getId(),
        order.getCustomer() != null ? order.getCustomer().getId() : 0,
        order.getCustomerName(), order.getCustomerLastName(),
        order.getCustomerPhoneNumber(), order.getCustomerCity(),
        order.getCustomerPostOffice(), order.getPaymentType(),
        order.getDatePlaced(), order.getStatus(),
        order.getComment() == null ? "" : order.getComment(),
        order.getTotalSum() == null ? BigDecimal.ZERO : order.getTotalSum(),
        orderItemDtos);
  }

  public static BigDecimal calculateTotalSum(Collection<OrderItem> orderItems) {
    return orderItems.stream()
        .map(orderItem ->
            orderItem.getProductPrice().multiply(new BigDecimal(orderItem.getProductQuantity())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
