package com.malikov.shopsystem.dto;

import java.util.List;

public class ProductPage extends Page<ProductDto> {

    List<ProductAggregatorDto> productAggregators;

    public List<ProductAggregatorDto> getProductAggregators() {
        return productAggregators;
    }

    public void setProductAggregators(List<ProductAggregatorDto> productAggregators) {
        this.productAggregators = productAggregators;
    }

}
