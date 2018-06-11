package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.service.reporting.PrintOrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/print-order")
public class PrintOrderController {

    private final PrintOrderService printOrderReportService;

    public PrintOrderController(PrintOrderService printOrderReportService) {
        this.printOrderReportService = printOrderReportService;
    }

    @GetMapping(value = "/{orderId}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String print(@PathVariable Long orderId) throws Exception {
        return printOrderReportService.printOrder(orderId);
    }

}
