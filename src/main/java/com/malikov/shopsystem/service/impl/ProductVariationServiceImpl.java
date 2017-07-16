package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.ProductVariationDto;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.service.ProductVariationService;
import com.malikov.shopsystem.util.ProductVariationConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductVariationServiceImpl implements ProductVariationService {

    @Autowired
    private ProductVariationRepository productVariationRepository;

    @Override
    public ProductVariation get(Long id) {
        return checkNotFoundById(productVariationRepository.findOne(id), id);
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
    public List<ProductVariationDto> getPage(int pageNumber, int pageCapacity) {
        return productVariationRepository
                .findAll(new PageRequest(pageNumber, pageCapacity))
                .getContent()
                .stream()
                .map(ProductVariationConverter::asDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        productVariationRepository.delete(id);
    }
}
