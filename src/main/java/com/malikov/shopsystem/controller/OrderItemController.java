package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.service.OrderLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/order-item")
public class OrderItemController {

    @Autowired
    private OrderLineService orderLineService;

    @GetMapping(value = "/autocomplete-by-product-name/{productNameMask}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductAutocompleteDto> autocompleteOrderItemName(
            @PathVariable("productNameMask") String productNameMask) {
        return orderLineService.getByProductMask(productNameMask);
    }

    @PostMapping(value = "/create-empty-for/{orderLineId}")
    public Long create(@PathVariable("orderLineId") Long orderLineId) {
        return orderLineService.create(orderLineId).getId();
    }

    @PutMapping(value = "/{orderLineId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@PathVariable("orderLineId") Long orderLineId,
                       @RequestBody OrderLineDto orderLineDto) {
        orderLineDto.setOrderItemId(orderLineId);
        orderLineService.update(orderLineDto);
    }

    @DeleteMapping(value = "/{orderLineId}")
    public void delete(@PathVariable("orderLineId") Long orderLineId) {
        orderLineService.delete(orderLineId);
    }
}
