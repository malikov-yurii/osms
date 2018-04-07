package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductPage extends Page<ProductDto> {

    List<ProductAggregatorDto> productAggregators;

}
