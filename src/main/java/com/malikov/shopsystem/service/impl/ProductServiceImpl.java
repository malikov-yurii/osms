package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.service.ProductService;
import com.malikov.shopsystem.to.ProductDto;
import com.malikov.shopsystem.util.ProductUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFound;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository repository;

    @Override
    public Product get(Long id) {
        return checkNotFound(repository.get(id), "exception.notFoundById");
    }

    @Override
    public List<ProductDto> getAllDtos() {
        List<ProductDto> allProductDtos = new ArrayList<>();
        for (Product product : repository.getAll()) {
            allProductDtos.addAll(ProductUtil.getProductDtosListFrom(product));
        }
        return allProductDtos;
    }

    @Override
    public void delete(Long id) {
        checkNotFound(repository.delete(id), "exception.notFoundById");
    }

    @Override
    public void update(Product product) {
        checkNotFound(repository.save(product), "exception.notFoundById");
    }

    @Override
    public void enableUnlimited(Long id, boolean unlimited) {
        Product product = get(id);
        product.setUnlimited(unlimited);
        update(product);
    }

    @Override
    public void enableHasVariations(Long id, boolean hasVariations) {
        Product product = get(id);
        product.setHasVariations(hasVariations);
        update(product);
    }

    @Override
    public List<Product> getByProductNameMask(String productNameMask) {
        return repository.getByProductNameMask(productNameMask);
    }
}
