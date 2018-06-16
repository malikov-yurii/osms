package com.malikov.shopsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.malikov.shopsystem.core.calculation.Calculable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class OrderLineDto implements Serializable, Calculable {

    private Long orderId;
    private Long orderLineId;
    private Long productId;
    private Long productVariationId;
    private String orderLineProductName;
    private Integer orderLineProductQuantity;
    private BigDecimal orderLineProductPrice;
    private String supplier;

    @Override
    @JsonIgnore
    public BigDecimal price() {
        return getOrderLineProductPrice();
    }

    @Override
    @JsonIgnore
    public Integer quantity() {
        return getOrderLineProductQuantity();
    }

}
