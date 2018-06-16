package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.Page;
import com.malikov.shopsystem.service.order.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class RootController {

    private final OrderService orderService;

    public RootController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping({"/", "/orders"})
    public String root(ModelMap model) {
        Page ordersPage = orderService.getPage(0, 20);
        model.put("orders", ordersPage.getContent()); // load orders to fill first page
        model.put("ordersTotal", ordersPage.getTotalElements());
        return "index";
    }

    @GetMapping({"/products", "/customers"})
    public String root() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

}
