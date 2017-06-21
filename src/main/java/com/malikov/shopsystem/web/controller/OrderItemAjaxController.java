package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/ajax/profile/order-item")
public class OrderItemAjaxController {

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    OrderService orderService;

    @PutMapping(value = "{itemId}/name")
    public void updateOrderItemName(@PathVariable("itemId") Long itemId, @RequestParam("name") String newName) {
        orderItemService.updateProductName(itemId, newName);
    }

    @PutMapping(value = "{itemId}/quantity")
    public int updateOrderItemQuantity(@PathVariable("itemId") Long itemId, @RequestParam("quantity") int quantity) {
        return orderItemService.updateOrderItemProductQuantity(itemId, quantity);
    }

    @PutMapping(value = "{itemId}/price")
    public int updateOrderItemPrice(@PathVariable("itemId") Long itemId, @RequestParam("price") int price) {
        return orderItemService.updateOrderItemProductPrice(itemId, price);
    }




}
