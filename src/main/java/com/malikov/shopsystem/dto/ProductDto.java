package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProductDto implements Serializable {

    private Long productId;
    private Long productVariationId;
    private String productName;
    private BigDecimal productPrice;
    private Integer productQuantity;
    private Boolean productQuantityUnlimited;
    private String productSupplier;
    private Boolean productAggregated;
    private String productImage;
    private List<String> productCategories;

}
