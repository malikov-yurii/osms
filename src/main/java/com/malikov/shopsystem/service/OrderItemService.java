package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderItemAutocompleteDto;
import com.malikov.shopsystem.dto.OrderItemLiteDto;
import com.malikov.shopsystem.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemService {

    OrderItem save(OrderItem orderItem);

    BigDecimal update(Long itemId, OrderItemLiteDto orderItemLiteDto);

    OrderItem get(Long id);

    BigDecimal delete(Long id);

    void updateProductName(Long id, String newProductName);

    BigDecimal updateOrderItemProductQuantity(Long itemId, int quantity);

    BigDecimal updateOrderItemProductPrice(Long itemId, BigDecimal price);

    OrderItem createNewEmpty(Long orderId);

    List<OrderItemAutocompleteDto> getByProductMask(String productNameMask);

    BigDecimal setProduct(Long itemId, Long productId);

    BigDecimal setProductVariation(Long itemId, Long productVariationId);

    //List<OrderItemDto> getPage(int pageNumber, int pageCapacity);
}
