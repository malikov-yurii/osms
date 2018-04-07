package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductAutocompleteDto {

    private String label;
    private Long productId;
    private Long productVariationId;
    private String productName;
    private BigDecimal productPrice;

}
