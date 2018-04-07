package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ProductAggregatorDto implements Serializable {

    private Long aggregatorId;
    private String aggregatorName;
    private Integer aggregatorQuantity;

}
