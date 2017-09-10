package com.malikov.shopsystem.web;

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

    @GetMapping("/orders")
    public String root() {
        return "/index.html";
    }

    @GetMapping("/products")
    public String products() {
        return "/index.html";
    }

    @GetMapping("/customers")
    public String customers() {
        return "/index.html";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(ModelMap model,
                        @RequestParam(value = "error", required = false) boolean error,
                        @RequestParam(value = "message", required = false) String message) {
        model.put("error", error);
        model.put("message", message);
        return "/WEB-INF/jsp/login.jsp";
    }
}
