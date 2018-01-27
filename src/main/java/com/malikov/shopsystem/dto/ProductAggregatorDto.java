package com.malikov.shopsystem.dto;

import java.io.Serializable;

public class ProductAggregatorDto implements Serializable {

    private Long aggregatorId;
    private String aggregatorName;
    private Integer aggregatorQuantity;

    public Long getAggregatorId() {
        return aggregatorId;
    }

    public void setAggregatorId(Long aggregatorId) {
        this.aggregatorId = aggregatorId;
    }

    public String getAggregatorName() {
        return aggregatorName;
    }

    public void setAggregatorName(String aggregatorName) {
        this.aggregatorName = aggregatorName;
    }

    public Integer getAggregatorQuantity() {
        return aggregatorQuantity;
    }

    public void setAggregatorQuantity(Integer aggregatorQuantity) {
        this.aggregatorQuantity = aggregatorQuantity;
    }

}
