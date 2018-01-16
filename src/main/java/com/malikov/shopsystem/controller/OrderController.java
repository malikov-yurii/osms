package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.GenericFilter;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.dto.OrderUpdateDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/order")
public class OrderController {

    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderMapper orderMapper;

    @PutMapping(value = "/filter",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelMap getFilteredPage(@RequestBody GenericFilter<OrderFilterDto, OrderDto> orderFilterDto) {
        ModelMap modelMap = new ModelMap();
        Page<OrderDto> page = orderService.getFilteredPage(orderFilterDto);
        modelMap.addAttribute("totalElements", page.getTotalElements());
        modelMap.addAttribute("elements", page.getContent());
        return modelMap;

    }
    @GetMapping(value = "/{id}")
    public OrderDto get(@PathVariable("id") Long orderId) {
        return orderMapper.toDto(orderService.get(orderId));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelMap getOrderTablePage(@RequestParam("pageNumber") int pageNumber,
                                      @RequestParam("pageCapacity") int pageCapacity) {
        ModelMap modelMap = new ModelMap();
        Page<OrderDto> page = orderService.getPage(pageNumber, pageCapacity);
        modelMap.addAttribute("totalElements", page.getTotalElements());
        modelMap.addAttribute("elements", page.getContent());
        return modelMap;
    }

    @GetMapping(value = "/autocomplete-payment-type", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaymentType[] autocompletePaymentType() {
        return PaymentType.values();
    }

    @GetMapping(value = "/autocomplete-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public OrderStatus[] autocompleteOrderStatus() {
        return OrderStatus.values();
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        orderService.delete(id);
    }

    @PostMapping
    public ModelMap createEmpty() {
        ModelMap model = new ModelMap();
        Order order = orderService.createEmpty();
        model.put("orderId", order.getId());
        model.put("orderItemId", order.getOrderItems().get(0).getId());
        return model;
    }

    @PutMapping(value = "/{orderId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrder(@PathVariable("orderId") Long orderId,
                               @RequestBody OrderUpdateDto orderUpdateDto) {
        orderUpdateDto.setId(orderId);
        orderService.update(orderUpdateDto);
    }

}
