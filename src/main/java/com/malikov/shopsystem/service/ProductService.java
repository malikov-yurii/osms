package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper mapper;

    public Product get(Long id) {
        return checkNotFoundById(productRepository.findOne(id), id);
    }

    public Page<ProductDto> getPage(int pageNumber, int pageCapacity) {
        List<ProductDto> allProducts = new ArrayList<>();
        Page<Product> page = productRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        for (Product product : page.getContent()) {
            if (product.getCategories().size() != 0) {
                allProducts.addAll(getDtosFrom(product));
            }
        }
        return new PageImpl<>(allProducts, null, page.getTotalElements());
    }

    private List<ProductDto> getDtosFrom(Product product) {
        List<ProductDto> products = new ArrayList<>();
        if (product.getHasVariations()) {
            products.addAll(product.getVariations()
                    .stream()
                    .map(mapper::toDto)
                    .collect(Collectors.toList()));
        } else {
            products.add(mapper.toDto(product));
        }
        return products;
    }

    @Transactional
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @Transactional
    public void update(ProductDto productDto) {
        Product product;
        checkNotFoundById(product = productRepository.findOne(productDto.getProductId()), productDto.getProductId());

        if (productDto.getProductVariationId() != null) {
            product.getVariations().stream()
                    .filter(productVariation -> Objects.equals(productVariation.getId(), productDto.getProductVariationId()))
                    .findFirst()
                    .ifPresent(productVariation -> {
                        if (productDto.getPrice() != null) {
                            productVariation.setPrice(productDto.getPrice());
                        }
                        if (productDto.getQuantity() != null) {
                            productVariation.setQuantity(productDto.getQuantity());
                        }
                    });
        } else {
            if (productDto.getPrice() != null) {
                product.setPrice(productDto.getPrice());
            }
            if (productDto.getQuantity() != null) {
                product.setQuantity(productDto.getQuantity());
            }
        }
        productRepository.save(product);
    }

}
