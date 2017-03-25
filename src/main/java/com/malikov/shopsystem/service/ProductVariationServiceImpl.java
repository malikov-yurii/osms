package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductVariationServiceImpl implements ProductVariationService {

    @Autowired
    ProductVariationRepository repository;

    @Override
    public ProductVariation save(ProductVariation productVariation) {
        return repository.save(productVariation);
    }

    @Override
    public ProductVariation update(ProductVariation productVariation) {
        return repository.save(productVariation);
    }

    @Override
    public ProductVariation get(int id) {
        return repository.get(id);
    }

    @Override
    public List<ProductVariation> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

}
