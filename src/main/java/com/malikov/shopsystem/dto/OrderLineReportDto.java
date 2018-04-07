package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderLineReportDto {

    private Integer orderLineIndex;
    private String name;
    private Integer quantity;
    private BigDecimal itemValue;
    private BigDecimal orderLineValue;

}
