package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.service.ProductAggregatorService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/product-aggregator", consumes = MediaType.APPLICATION_JSON_VALUE)
public class ProductAggregatorController {

    private final ProductAggregatorService productAggregatorService;

    public ProductAggregatorController(ProductAggregatorService productAggregatorService) {
        this.productAggregatorService = productAggregatorService;
    }

    @PutMapping("/{aggregatorId}")
    public void update(@PathVariable Long aggregatorId, @RequestBody ProductAggregatorDto aggregatorDto) {
        aggregatorDto.setAggregatorId(aggregatorId);
        productAggregatorService.update(aggregatorDto);
    }

}
