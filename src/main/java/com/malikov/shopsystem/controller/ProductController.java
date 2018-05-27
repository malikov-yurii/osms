package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
import com.malikov.shopsystem.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ProductPage getProductTablePage(@RequestParam int pageNumber, @RequestParam int pageCapacity) {
        return productService.getPage(pageNumber, pageCapacity);
    }

    @GetMapping(value = "/{productId}")
    public Product get(@PathVariable Long productId) {
        return productService.get(productId);
    }

    @DeleteMapping(value = "/{productId}")
    public void delete(@PathVariable Long productId) {
        productService.delete(productId);
    }

    @PutMapping(value = "/{productId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProduct(@PathVariable Long productId, @RequestBody ProductDto productDto){
        productDto.setProductId(productId);
        productService.update(productDto);
    }

}
