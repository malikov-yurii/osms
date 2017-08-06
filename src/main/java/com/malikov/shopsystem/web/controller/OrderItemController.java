package com.malikov.shopsystem.web.controller;

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

    @GetMapping(value = "/autocomplete-by-product-name/{productNameMask}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductAutocompleteDto> autocompleteOrderItemName(
            @PathVariable("productNameMask") String productNameMask) {
        return orderItemService.getByProductMask(productNameMask);
    }

    @PostMapping(value = "/create-empty-for/{orderId}")
    public Long createNewEmptyOrderItem(@PathVariable("orderId") Long orderId) {
        return orderItemService.createNewEmpty(orderId).getId();
    }

    @PutMapping(value = "/{itemId}", params = "productId")
    public BigDecimal updateOrderItemSetNewProduct(@PathVariable("itemId") Long itemId,
            @RequestParam(value = "productId") Long productId) {
        return orderItemService.setProduct(itemId, productId).setScale(0, RoundingMode.HALF_UP);
    }

    @PutMapping(value = "/{itemId}", params = "productVariationId")
    public BigDecimal updateOrderItemSetNewProductVariation(@PathVariable("itemId") Long itemId,
            @RequestParam(value = "productVariationId") Long productVariationId) {
        return orderItemService.setProductVariation(itemId, productVariationId)
                .setScale(0, RoundingMode.HALF_UP);
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
    public BigDecimal deleteOrderItem(@PathVariable("orderItemId") Long orderItemId) {
        return orderItemService.delete(orderItemId).setScale(0, RoundingMode.HALF_UP);
    }
}
