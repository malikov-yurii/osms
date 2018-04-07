package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
public class OrderLineDto implements Serializable {

    private Long orderLineId;
    private Long productId;
    private Long productVariationId;
    private String orderLineProductName;
    private Integer orderLineProductQuantity;
    private BigDecimal orderLineProductPrice;
    private String supplier;

}
