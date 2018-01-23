package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.dto.Page;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
        value = "/order", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PutMapping(value = "/filter", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Page<OrderDto> getFilteredPage(@RequestBody GenericFilter<OrderFilterDto, OrderDto> orderFilterDto) {
        return orderService.getPage(orderFilterDto);
    }

    @GetMapping
    public Page<OrderDto> getPage(@RequestParam("pageNumber") int pageNumber,
                                  @RequestParam("pageCapacity") int pageCapacity) {
        return orderService.getPage(pageNumber, pageCapacity);
    }

    @GetMapping("/{id}")
    public OrderDto get(@PathVariable("id") Long orderId) {
        return orderService.get(orderId);
    }

    @GetMapping("/autocomplete-payment-type")
    public PaymentType[] autocompletePaymentType() {
        return PaymentType.values();
    }

    @GetMapping("/autocomplete-status")
    public OrderStatus[] autocompleteOrderStatus() {
        return OrderStatus.values();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        orderService.delete(id);
    }

    @PostMapping
    public OrderDto createEmpty() {
        return orderService.create();
    }

    @PutMapping(value = "/{orderId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrder(@PathVariable("orderId") Long orderId,
                               @RequestBody OrderUpdateDto orderUpdateDto) {
        orderUpdateDto.setId(orderId);
        orderService.update(orderUpdateDto);
    }

}
