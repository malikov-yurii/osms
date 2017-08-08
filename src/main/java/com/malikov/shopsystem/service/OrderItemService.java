package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderItemDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemService {

    OrderItem save(OrderItem orderItem);

    BigDecimal updateAndReturnTotalSum(OrderItemDto orderItemDto);

    OrderItem get(Long id);

    BigDecimal delete(Long id);

    OrderItem createNewEmpty(Long orderId);

    List<ProductAutocompleteDto> getByProductMask(String productNameMask);

}
