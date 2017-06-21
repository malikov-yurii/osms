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
}
