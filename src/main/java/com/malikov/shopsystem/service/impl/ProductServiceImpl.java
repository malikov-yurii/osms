package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.service.ProductService;
import com.malikov.shopsystem.util.ProductUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product get(Long id) {
        return checkNotFoundById(productRepository.findOne(id), id);
    }

    @Override
    public List<ProductDto> getPage(int pageNumber, int pageCapacity) {
        List<ProductDto> allProductDtos = new ArrayList<>();
        for (Product product : productRepository.findAll(new PageRequest(pageNumber, pageCapacity))) {
            allProductDtos.addAll(ProductUtil.getProductDtosListFrom(product));
        }
        return allProductDtos;
    }

    @Override
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @Override
    public void update(Product product) {
        checkNotFoundById(productRepository.save(product), product.getId());
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
        return productRepository.getByNameLike(productNameMask);
    }
}
