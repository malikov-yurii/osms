package com.malikov.shopsystem.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.web.json.JacksonObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RootController {

    //@Autowired
    //private ApplicationContext appContext;

    @Autowired private OrderService orderService;

    @GetMapping({"/", "/orders", "/products", "/customers"})
    public String root(ModelMap model) throws JsonProcessingException {
        Page ordersPage = orderService.getPage(0, 10);
        model.put("orders", JacksonObjectMapper.getMapper().writeValueAsString(ordersPage.getContent()));
        model.put("ordersTotal", JacksonObjectMapper.getMapper().writeValueAsString(ordersPage.getTotalElements()));
        return "/WEB-INF/jsp/index.jsp";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(ModelMap model,
                        @RequestParam(value = "error", required = false) boolean error,
                        @RequestParam(value = "message", required = false) String message) throws JsonProcessingException {
        model.put("error", error);
        model.put("message", message);
        return "/WEB-INF/jsp/login.jsp";
    }
}
