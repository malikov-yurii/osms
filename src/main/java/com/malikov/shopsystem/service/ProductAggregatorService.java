package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductAggregatorDto;
import com.malikov.shopsystem.mapper.ProductAggregatorMapper;
import com.malikov.shopsystem.domain.ProductAggregator;
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
    @Autowired
    private ProductAggregatorMapper productAggregatorMapper;

    public List<ProductAggregatorDto> findAll() {

        return stream(productAggregatorRepository.findAll())
                .map(productAggregatorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void update(ProductAggregatorDto dto) {

        ProductAggregator productAggregator =
                checkNotFoundById(productAggregatorRepository.findOne(dto.getAggregatorId()), dto.getAggregatorId());

        productAggregator.setQuantity(dto.getQuantity());

        productAggregatorRepository.save(productAggregator);
    }

}
