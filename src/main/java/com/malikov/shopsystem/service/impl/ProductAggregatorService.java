package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.model.ProductAggregator;
import com.malikov.shopsystem.repository.ProductAggregatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.collect.Streams.stream;
import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

/**
 * @author Yurii Malikov
 */
@Service
public class ProductAggregatorService {

    @Autowired
    private ProductAggregatorRepository productAggregatorRepository;

    public List<ProductAggregatorDto> findAll() {
        return stream(productAggregatorRepository.findAll())
                .map(ProductAggregatorDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void update(ProductAggregatorDto productAggregatorDto) {
        ProductAggregator productAggregator;
        checkNotFoundById(productAggregator = productAggregatorRepository.findOne(productAggregatorDto.getId()),
                productAggregatorDto.getId());
        productAggregator.setQuantity(productAggregatorDto.getQuantity());
        productAggregatorRepository.save(productAggregator);
    }
}
