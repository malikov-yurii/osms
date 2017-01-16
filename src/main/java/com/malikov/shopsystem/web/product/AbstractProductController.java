package com.malikov.shopsystem.web.product;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public abstract class AbstractProductController {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractProductController.class);

    @Autowired
    private ProductService service;

    public Product get(int id) {
        LOG.info("get product {}", id);
        return service.get(id);
    }

    public void delete(int id) {
        LOG.info("delete product {}", id);
        service.delete(id);
    }

    public List<Product> getAll() {
        LOG.info("getAll products");
        return service.getAll();
    }

    public void update(Product product, int id) {
        product.setId(id);
        LOG.info("update product{}", product);
        service.update(product);
    }

    public Product create(Product product) {
        product.setId(null);
        LOG.info("create product{}", product);
        return service.save(product);
    }

    public List<Product> getBetween(LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime) {
        LOG.info("getBetween dates {} - {} for time {} - {} ", startDate, endDate, startTime, endTime);

        // TODO: 1/16/2017 I NEED IMPLEMENT THIS METHOD
        return getAll();
    }
}