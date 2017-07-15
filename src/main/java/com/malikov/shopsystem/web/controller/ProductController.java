package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.service.ProductService;
import com.malikov.shopsystem.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductDto> getAll() {
        return productService.getPage(0, 1000 );
    }

    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") Long id) {
        return productService.get(id);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @PutMapping(value = "/{id}/unlimited-state")
    public void changeUnlimited(@PathVariable("id") Long id, @RequestParam("unlimited") boolean unlimited) {
        productService.enableUnlimited(id, unlimited);
    }

    @PutMapping(value = "/{id}/has-variations-state")
    public void changeHasVariations(@PathVariable("id") Long id, @RequestParam("hasVariations") boolean hasVariations) {
        productService.enableHasVariations(id, hasVariations);
    }
}
