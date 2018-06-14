package com.malikov.shopsystem.service.reporting;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.core.reporting.OrderBase64PdfPrinter;
import com.malikov.shopsystem.service.ordering.OrderService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class PrintOrderService {

    private static final String ORDER_REPORT_TEMPLATE_PATH = "classpath:reporting/template/printOrder.jrxml";

    private final ResourceLoader resourceLoader;
    private final OrderService orderService;

    private OrderBase64PdfPrinter printer;

    public PrintOrderService(OrderService orderService, ResourceLoader resourceLoader) {
        this.orderService = orderService;
        this.resourceLoader = resourceLoader;
    }

    @PostConstruct
    private final void init() {
        Resource templateResource = resourceLoader.getResource(ORDER_REPORT_TEMPLATE_PATH);
        printer = new OrderBase64PdfPrinter(templateResource);
    }

    public String printOrder(Long orderId) {
        OrderDto order = orderService.get(orderId);
        return printer.print(order);
    }

}
