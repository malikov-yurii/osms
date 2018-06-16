package com.malikov.shopsystem.service.product;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.mapper.UpdateProductByNotNullFieldsMapper;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariationRepository productVariationRepository;
    private final UpdateProductByNotNullFieldsMapper updateProductByNotNullFieldsMapper;
    private final ProductMapper productMapper;
    private final ProductAggregatorService productAggregatorService;

    public ProductService(ProductRepository productRepository, ProductVariationRepository productVariationRepository,
                          UpdateProductByNotNullFieldsMapper updateProductByNotNullFieldsMapper,
                          ProductMapper productMapper, ProductAggregatorService productAggregatorService) {
        this.productRepository = productRepository;
        this.productVariationRepository = productVariationRepository;
        this.updateProductByNotNullFieldsMapper = updateProductByNotNullFieldsMapper;
        this.productMapper = productMapper;
        this.productAggregatorService = productAggregatorService;
    }

    public Product get(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public ProductPage getPage(int pageNumber, int pageCapacity) {
        Page<Product> page = productRepository.findAll(PageRequest.of(pageNumber, pageCapacity));
        ProductPage productPage = productMapper.toProductPage(page);
        productPage.setProductAggregators(productAggregatorService.findAll());
        return productPage;
    }

    @Transactional
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void update(ProductDto dto) {
        if (requiredDataToUpdateProductIsPresent(dto)) {
            updateProductOrProductVariation(dto);
        }
    }

    private void updateProductOrProductVariation(ProductDto dto) {
        if (Objects.nonNull(dto.getProductVariationId())) {
            updateProductVariation(dto);
        } else {
            updateProduct(dto);
        }
    }

    private void updateProduct(ProductDto dto) {
        Product product = get(dto.getProductId());
        updateProductByNotNullFieldsMapper.update(dto, product);
    }

    private void updateProductVariation(ProductDto dto) {
        Long productVariationId = dto.getProductVariationId();
        ProductVariation productVariation = productVariationRepository.findById(productVariationId).orElse(null);
        updateProductByNotNullFieldsMapper.update(dto, productVariation);
    }

    private boolean requiredDataToUpdateProductIsPresent(ProductDto dto) {
        return (Objects.nonNull(dto.getProductPrice()) || Objects.nonNull(dto.getProductQuantity()))
                && (Objects.nonNull(dto.getProductId()) || Objects.nonNull(dto.getProductVariationId()));
    }

}
