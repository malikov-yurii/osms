package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.dto.OrderItemDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/order-item")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping(value = "/autocomplete-by-product-name/{productNameMask}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductAutocompleteDto> autocompleteOrderItemName(
            @PathVariable("productNameMask") String productNameMask) {
        return orderItemService.getByProductMask(productNameMask);
    }

    @PostMapping(value = "/create-empty-for/{orderId}")
    public Long createNewEmptyOrderItem(@PathVariable("orderId") Long orderId) {
        return orderItemService.createNewEmpty(orderId).getId();
    }

    @PutMapping(value = "/{itemId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public BigDecimal updateOrderItem(@PathVariable("itemId") Long itemId,
                                @RequestBody OrderItemDto orderItemDto) {
        orderItemDto.setOrderItemId(itemId);
        return orderItemService.updateAndReturnTotalSum(orderItemDto).setScale(0, RoundingMode.HALF_UP);
    }

    @DeleteMapping(value = "/{orderItemId}")
    public BigDecimal deleteOrderItem(@PathVariable("orderItemId") Long orderItemId) {
        return orderItemService.delete(orderItemId).setScale(0, RoundingMode.HALF_UP);
    }
}
