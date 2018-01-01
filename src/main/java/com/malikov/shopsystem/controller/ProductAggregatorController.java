package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.service.ProductAggregatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/product-aggregator")
public class ProductAggregatorController {

    @Autowired
    private ProductAggregatorService productAggregatorService;

    @PutMapping(value = "/{productAggregatorId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProduct(@PathVariable("productAggregatorId") Long productAggregatorId,
                              @RequestBody ProductAggregatorDto productAggregatorDto) {
        productAggregatorDto.setId(productAggregatorId);
        productAggregatorService.update(productAggregatorDto);
    }
}
