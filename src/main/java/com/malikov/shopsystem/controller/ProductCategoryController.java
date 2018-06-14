package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.service.product.ProductCategoryService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Yurii Malikov
 */
@RestController
@RequestMapping(value = "/product-category", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public List<String> getProductCategoryNames() {
        return productCategoryService.getAllNames();
    }

}
