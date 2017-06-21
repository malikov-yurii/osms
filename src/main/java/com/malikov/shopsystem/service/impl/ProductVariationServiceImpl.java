package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.service.ProductVariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFound;

@Service
public class ProductVariationServiceImpl implements ProductVariationService {

    @Autowired
    ProductVariationRepository productVariationRepository;

    @Override
    public ProductVariation get(Long id) {
        return checkNotFound(productVariationRepository.get(id), "not found");
    }

    @Override
    public ProductVariation create(ProductVariation productVariation) {
        return checkNotFound(productVariationRepository.save(productVariation), "not found");
    }

    @Override
    public void update(ProductVariation productVariation) {
        checkNotFound(productVariationRepository.save(productVariation), "not found");
    }

    @Override
    public List<ProductVariation> getAll() {
        return productVariationRepository.getAll();
    }

    @Override
    public void delete(Long id) {
        checkNotFound(productVariationRepository.delete(id), "not found");
    }
}
