package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.ProductAggregator;
import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.mapper.ProductAggregatorMapper;
import com.malikov.shopsystem.repository.ProductAggregatorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.collect.Streams.stream;

@Service
public class ProductAggregatorService {

    private final ProductAggregatorRepository productAggregatorRepository;
    private final ProductAggregatorMapper productAggregatorMapper;

    public ProductAggregatorService(ProductAggregatorRepository productAggregatorRepository,
                                    ProductAggregatorMapper productAggregatorMapper) {
        this.productAggregatorRepository = productAggregatorRepository;
        this.productAggregatorMapper = productAggregatorMapper;
    }

    public List<ProductAggregatorDto> findAll() {

        return stream(productAggregatorRepository.findAll())
                .map(productAggregatorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void update(ProductAggregatorDto dto) {
        ProductAggregator productAggregator = productAggregatorRepository.findOne(dto.getAggregatorId());
        productAggregator.setQuantity(dto.getAggregatorQuantity());
        productAggregatorRepository.save(productAggregator);
    }

}
