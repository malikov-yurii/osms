package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.service.ProductAggregatorService;
import com.malikov.shopsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductAggregatorService productAggregatorService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelMap getProductTablePage(@RequestParam("pageNumber") int pageNumber,
                                         @RequestParam("pageCapacity") int pageCapacity) {
        ModelMap modelMap = new ModelMap();
        Page<ProductDto> page = productService.getPage(pageNumber, pageCapacity);
        modelMap.addAttribute("totalElements", page.getTotalElements());
        modelMap.addAttribute("elements", page.getContent());
        modelMap.addAttribute("productAggregators", productAggregatorService.findAll());
        return modelMap;
    }

    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") Long id) {
        return productService.get(id);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @PutMapping(value = "/{productId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProduct(@PathVariable("productId") Long productId,
                              @RequestBody ProductDto productDto){
        productDto.setProductId(productId);
        productService.update(productDto);
    }
}
