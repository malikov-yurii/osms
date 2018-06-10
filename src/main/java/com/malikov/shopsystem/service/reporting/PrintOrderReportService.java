package com.malikov.shopsystem.service.reporting;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.dto.OrderLineReportDto;
import com.malikov.shopsystem.repository.OrderRepository;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;
import static java.util.Optional.ofNullable;
import static net.sf.jasperreports.engine.JasperCompileManager.compileReport;
import static net.sf.jasperreports.engine.JasperExportManager.exportReportToPdf;
import static net.sf.jasperreports.engine.JasperFillManager.fillReport;

@Service
public class PrintOrderReportService {

    private static final String PRINT_ORDER_TEMPLATE_PATH = "template/printOrder.jrxml";
    private static final String CUSTOMER_NAME = "customerName";
    private static final String CUSTOMER_PHONE_NUMBER = "customerPhoneNumber";
    private static final String DESTINATION = "destination";
    private static final String TOTAL_ORDER_AMOUNT = "totalOrderAmount";
    private static final String PAYMENT_TYPE = "paymentType";

    private final OrderRepository orderRepository;

    public PrintOrderReportService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public byte[] printOrder(Long orderId) throws IOException, JRException {
        Order order = orderRepository.findById(orderId).orElse(null);
        JRBeanCollectionDataSource source = new JRBeanCollectionDataSource(prepareOrderLines(order));
        String template = getClass().getClassLoader().getResource(PRINT_ORDER_TEMPLATE_PATH).getFile();
        return exportReportToPdf(fillReport(compileReport(template), parameters(order), source));
    }

    private Map<String, Object> parameters(Order order) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(CUSTOMER_NAME, customerName(order));
        parameters.put(CUSTOMER_PHONE_NUMBER, customerPhoneNumber(order));
        parameters.put(DESTINATION, shippingDestination(order));
        parameters.put(TOTAL_ORDER_AMOUNT, order.getTotalSum());
        parameters.put(PAYMENT_TYPE, order.getPaymentType().toString());
        return parameters;
    }

    private String customerName(Order order) {
        return ofNullable(order.getCustomerFirstName())
                .map(firstName -> order.getCustomerLastName() + " " + firstName)
                .orElse(order.getCustomerLastName());
    }

    private String customerPhoneNumber(Order order) {
        return ofNullable(order.getCustomerPhoneNumber())
                .filter(StringUtils::isNotBlank)
                .map(formatPhoneNumber())
                .orElse(StringUtils.EMPTY);
    }

    private Function<String, String> formatPhoneNumber() {
        return phoneNumber -> "+38(" + phoneNumber.substring(0,3) + ")" + phoneNumber.substring(3,5) + "-"
                + phoneNumber.substring(5,7) + "-" + phoneNumber.substring(7);
    }

    private String shippingDestination(Order order) {
        return ofNullable(order.getDestinationPostOffice())
                .map(postOffice -> order.getDestinationCity() + ", " + postOffice)
                .orElse(order.getDestinationCity());
    }

    private List<OrderLineReportDto> prepareOrderLines(Order order) {
        List<OrderLine> listOrderLines = nonNull(order.getOrderLines()) ? order.getOrderLines() : emptyList();
        List<OrderLineReportDto> result = new ArrayList<>();
        for (int i = 0; i < listOrderLines.size(); i++) {
            result.add(toOrderLineReportDto(i, listOrderLines.get(i)));
        }
        return result;
    }

    private OrderLineReportDto toOrderLineReportDto(int i, OrderLine orderLine) {

        OrderLineReportDto orderLineReportDto = new OrderLineReportDto();
        orderLineReportDto.setOrderLineIndex(i + 1);
        orderLineReportDto.setName(orderLine.getProductName());
        orderLineReportDto.setQuantity(orderLine.getProductQuantity());
        orderLineReportDto.setItemValue(orderLine.getProductPrice());
        orderLineReportDto.setOrderLineValue(orderLineValue(orderLine));

        return orderLineReportDto;
    }

    private BigDecimal orderLineValue(OrderLine orderLine) {
        return nonNull(orderLine.getProductPrice()) && nonNull(orderLine.getProductQuantity())
                ? orderLine.getProductPrice().multiply(BigDecimal.valueOf(orderLine.getProductQuantity()))
                : null;
    }

}
