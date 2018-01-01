package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductVariationDto;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.util.ProductVariationConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductVariationService {

    @Autowired
    private ProductVariationRepository productVariationRepository;

    public ProductVariation get(Long id) {
        return checkNotFoundById(productVariationRepository.findOne(id), id);
    }

    public ProductVariation create(ProductVariation productVariation) {
        return productVariationRepository.save(productVariation);
    }

    public void update(ProductVariation productVariation) {
        checkNotFoundById(productVariationRepository.save(productVariation), productVariation.getId());
    }

    public List<ProductVariationDto> getPage(int pageNumber, int pageCapacity) {
        return productVariationRepository
                .findAll(new PageRequest(pageNumber, pageCapacity))
                .getContent()
                .stream()
                .map(ProductVariationConverter::asDto)
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        productVariationRepository.delete(id);
    }
}
