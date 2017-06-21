package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.service.ProductVariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFound;
import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductVariationServiceImpl implements ProductVariationService {

    @Autowired
    ProductVariationRepository productVariationRepository;

    @Override
    public ProductVariation get(Long id) {
        return checkNotFoundById(productVariationRepository.get(id), id);
    }

    @Override
    public ProductVariation create(ProductVariation productVariation) {
        return productVariationRepository.save(productVariation);
    }

    @Override
    public void update(ProductVariation productVariation) {
        checkNotFoundById(productVariationRepository.save(productVariation), productVariation.getId());
    }

    @Override
    public List<ProductVariation> getAll() {
        return productVariationRepository.getAll();
    }

    @Override
    public void delete(Long id) {
        checkNotFoundById(productVariationRepository.delete(id), id);
    }
}
