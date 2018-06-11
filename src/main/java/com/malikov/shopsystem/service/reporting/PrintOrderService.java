package com.malikov.shopsystem.service.reporting;

import com.malikov.shopsystem.exception.NotFoundException;
import com.malikov.shopsystem.reporting.OrderBase64PdfPrinter;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class PrintOrderService {

    private static final String PRINT_ORDER_TEMPLATE_PATH = "classpath:reporting/template/printOrder.jrxml";

    private final ResourceLoader resourceLoader;
    private final OrderRepository orderRepository;

    private OrderBase64PdfPrinter printer;

    public PrintOrderService(OrderRepository orderRepository, ResourceLoader resourceLoader) {
        this.orderRepository = orderRepository;
        this.resourceLoader = resourceLoader;
    }

    @PostConstruct
    private final void init() {
        Resource templateResource = resourceLoader.getResource(PRINT_ORDER_TEMPLATE_PATH);
        printer = new OrderBase64PdfPrinter(templateResource);
    }

    public String printOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> printer.print(order))
                .orElseThrow(() -> new NotFoundException(String.format("Order id=%s not found", orderId)));
    }

}
