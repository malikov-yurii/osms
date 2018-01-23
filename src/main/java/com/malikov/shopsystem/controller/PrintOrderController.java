package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.service.reporting.PrintOrderReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/print-order")
public class PrintOrderController {

    @Autowired
    private PrintOrderReportService printOrderReportService;

    @GetMapping(value = "/{orderId}")
    public byte[] print(@PathVariable Long orderId) throws Exception {
        return printOrderReportService.printOrder(orderId);
    }

}
