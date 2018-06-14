package com.malikov.shopsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.malikov.shopsystem.core.calculation.Calculable;
import com.malikov.shopsystem.core.calculation.CalculableContainer;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.core.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class OrderDto  implements Serializable, CalculableContainer {

    @DateTimeFormat(pattern = DateTimeUtil.DATE_TIME_PATTERN)
    private LocalDateTime createdDateTime;
    private Long orderId;
    private Long customerId;
    private String customerLastName;
    private String customerFirstName;
    private String customerPhoneNumber;
    private String destinationCity;
    private String destinationPostOffice;
    private String customerNote;
    private PaymentType paymentType;
    private BigDecimal totalValue;
    private OrderStatus status;
    private String orderNote;
    private List<OrderLineDto> orderLines = new ArrayList<>();

    @Override
    public Collection<? extends Calculable> getCalculableItems() {
        return getOrderLines();
    }
}
