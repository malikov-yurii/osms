package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.dto.OrderItemAutocompleteDto;
import com.malikov.shopsystem.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/order-item")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping(value = "/autocomplete-by-product-name/{productNameMask}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderItemAutocompleteDto> autocompleteOrderItemName(
            @PathVariable("productNameMask") String productNameMask) {
        return orderItemService.getByProductMask(productNameMask);
    }

    @PostMapping(value = "/create-empty-for/{orderId}")
    public Long createNewEmptyOrderItem(@PathVariable("orderId") Long orderId) {
        return orderItemService.createNewEmpty(orderId).getId();
    }

    @PutMapping(value = "/{itemId}", params = "productId")
    public void updateOrderItemSetNewProduct(@PathVariable("itemId") Long itemId,
            @RequestParam(value = "productId") Long productId) {
        orderItemService.setProduct(itemId, productId);
    }

    @PutMapping(value = "/{itemId}", params = "productVariationId")
    public void updateOrderItemSetNewProductVariation(@PathVariable("itemId") Long itemId,
            @RequestParam(value = "productVariationId") Long productVariationId) {
        orderItemService.setProductVariation(itemId, productVariationId);
    }

    @PutMapping(value = "/{itemId}/name")
    public void updateOrderItemName(@PathVariable("itemId") Long itemId,
                                    @RequestParam("name") String newName) {
        orderItemService.updateProductName(itemId, newName);
    }

    @PutMapping(value = "/{itemId}/quantity")
    public BigDecimal updateOrderItemQuantity(@PathVariable("itemId") Long itemId,
                                              @RequestParam("quantity") int quantity) {
        return orderItemService.updateOrderItemProductQuantity(itemId, quantity);
    }

    @PutMapping(value = "/{itemId}/price")
    public BigDecimal updateOrderItemPrice(@PathVariable("itemId") Long itemId,
                                           @RequestParam("price") BigDecimal price) {
        return orderItemService.updateOrderItemProductPrice(itemId, price);
    }

    @DeleteMapping(value = "/{orderItemId}")
    public void deleteOrderItem(@PathVariable("orderItemId") Long orderItemId) {
        orderItemService.delete(orderItemId);
    }
}
