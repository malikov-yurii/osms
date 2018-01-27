package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.mapper.ProductUpdateByNotNullFieldsMapper;
import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;
import static java.util.Objects.nonNull;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private ProductUpdateByNotNullFieldsMapper productUpdateByNotNullFieldsMapper;
    @Autowired
    private ProductMapper mapper;
    @Autowired
    private ProductAggregatorService productAggregatorService;

    public Product get(Long id) {
        return checkNotFoundById(productRepository.findOne(id), id);
    }

    public ProductPage getPage(int pageNumber, int pageCapacity) {
        ProductPage productPage = mapper.toPage(productRepository.findAll(new PageRequest(pageNumber, pageCapacity)));
        productPage.setProductAggregators(productAggregatorService.findAll());
        return productPage;
    }

    @Transactional
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @Transactional
    public void update(ProductDto dto) {

        if (requiredDataToUpdateProductIsPresent(dto)) {
            updateProductOrProductVariation(dto);
        }
    }

    private void updateProductOrProductVariation(ProductDto dto) {

        if (nonNull(dto.getProductVariationId())) {
            updateProductVariation(dto);
        } else {
            updateProduct(dto);
        }
    }

    private void updateProduct(ProductDto dto) {

        Product product = productRepository.findOne(dto.getProductId());
        productUpdateByNotNullFieldsMapper.update(dto, product);
    }

    private void updateProductVariation(ProductDto dto) {

        ProductVariation productVariation = productVariationRepository.findOne(dto.getProductVariationId());
        productUpdateByNotNullFieldsMapper.update(dto, productVariation);
    }

    private boolean requiredDataToUpdateProductIsPresent(ProductDto dto) {

        return (nonNull(dto.getProductPrice()) || nonNull(dto.getProductQuantity()))
                && (nonNull(dto.getProductId()) || nonNull(dto.getProductVariationId()));
    }

}
