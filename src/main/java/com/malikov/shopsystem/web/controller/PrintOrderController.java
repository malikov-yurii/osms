package com.malikov.shopsystem.web.controller;

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

    @GetMapping(value = "/{orderNumber}")
    public byte[] print(@PathVariable("orderNumber") Long orderNumber) throws Exception {
        return printOrderReportService.printOrder(orderNumber);
    }

}
