package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderItemAutocompleteDto;
import com.malikov.shopsystem.dto.OrderItemLiteDto;
import com.malikov.shopsystem.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemService{

    OrderItem save(OrderItem orderItem);

    void  update(Long itemId, OrderItemLiteDto orderItemLiteDto);

    OrderItem get(Long id);

    void delete(Long id);

    void updateProductName(Long id, String newProductName);

    int updateOrderItemProductQuantity(Long itemId, int quantity);
    int updateOrderItemProductPrice(Long itemId, BigDecimal price);

    OrderItem createNewEmpty(Long orderId);

    List<OrderItemAutocompleteDto> getByProductMask(String productNameMask);
}
