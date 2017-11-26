package com.malikov.shopsystem.service.reporting;

import com.malikov.shopsystem.dto.OrderLineReportDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.repository.OrderRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;
import static net.sf.jasperreports.engine.JasperCompileManager.compileReport;
import static net.sf.jasperreports.engine.JasperExportManager.exportReportToPdf;
import static net.sf.jasperreports.engine.JasperFillManager.fillReport;

/**
 * @author Yurii Malikov
 */
@Service
public class PrintOrderReportService {

    public static final String PRINT_ORDER_TEMPLATE_PATH = "template/printOrder.jrxml";

    @Autowired
    private OrderRepository orderRepository;

    public byte[] printOrder(Long orderId) throws IOException, JRException {
        Order order = orderRepository.findOne(orderId);
        JRBeanCollectionDataSource source = new JRBeanCollectionDataSource(prepareOrderLines(order));
        String template = getClass().getClassLoader().getResource(PRINT_ORDER_TEMPLATE_PATH).getFile();
        return exportReportToPdf(fillReport(compileReport(template), parameters(order.getTotalValue()), source));
    }

    private Map<String, Object> parameters(BigDecimal totalOrderAmount) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("totalOrderAmount", totalOrderAmount);
        return parameters;
    }

    private List<OrderLineReportDto> prepareOrderLines(Order order) {
        List<OrderLine> listOrderLines = nonNull(order.getOrderItems()) ? order.getOrderItems() : emptyList();
        List<OrderLineReportDto> result = new ArrayList<>();
        for (int i = 0; i < listOrderLines.size(); i++) {
            result.add(toOrderLineReportDto(i, listOrderLines.get(i)));
        }
        return result;
    }

    private OrderLineReportDto toOrderLineReportDto(int i, OrderLine orderLine) {
        return new OrderLineReportDto(i + 1, orderLine.getProductName(), orderLine.getProductQuantity(),
                orderLine.getProductPrice(), orderLineValue(orderLine));
    }

    private BigDecimal orderLineValue(OrderLine orderLine) {
        return nonNull(orderLine.getProductPrice()) && nonNull(orderLine.getProductQuantity())
                ? orderLine.getProductPrice().multiply(BigDecimal.valueOf(orderLine.getProductQuantity()))
                : null;
    }

}
