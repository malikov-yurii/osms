package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.model.OrderLine;

import java.math.BigDecimal;
import java.util.List;

public interface OrderItemService {

    OrderLine save(OrderLine orderLine);

    BigDecimal updateAndReturnTotalSum(OrderLineDto orderLineDto);

    OrderLine get(Long id);

    BigDecimal delete(Long id);

    OrderLine createNewEmpty(Long orderId);

    List<ProductAutocompleteDto> getByProductMask(String productNameMask);

}
