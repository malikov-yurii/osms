package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.util.DateTimeUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDto  implements Serializable {

    @DateTimeFormat(pattern = DateTimeUtil.DATE_TIME_PATTERN)
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
    private LocalDateTime createdDateTime;
    private OrderStatus status;
    private String orderNote;
    private List<OrderLineDto> orderLines;

}
