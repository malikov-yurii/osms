package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.service.ProductService;
import com.malikov.shopsystem.util.ProductUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product get(Long id) {
        return checkNotFoundById(productRepository.findOne(id), id);
    }

    @Override
    public Page<ProductDto> getPage(int pageNumber, int pageCapacity) {
        List<ProductDto> allProductDtos = new ArrayList<>();
        Page<Product> page = productRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        for (Product product : page.getContent()) {
            allProductDtos.addAll(ProductUtil.getDtosFrom(product));
        }
        return new PageImpl<>(allProductDtos, null, page.getTotalElements());
    }
/*

    @Override
    public Page<ProductDto> getPageByCategoryName(String categoryName, int pageNumber, int pageCapacity) {
        List<ProductDto> allProductDtos = new ArrayList<>();
        Page<Product> page = productRepository.findAllByCategoryName(new PageRequest(pageNumber, pageCapacity));
        for (Product product : page.getContent()) {
            allProductDtos.addAll(ProductUtil.getDtosFrom(product));
        }
        return new PageImpl<>(allProductDtos, null, page.getTotalElements());
    }
*/

    @Override
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @Override
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

    /*@Override
    public void enableUnlimited(Long id, boolean unlimited) {
        Product product = get(id);
        product.setUnlimited(unlimited);
        update(product);
    }

    @Override
    public void enableHasVariations(Long id, boolean hasVariations) {
        Product product = get(id);
        product.setHasVariations(hasVariations);
        update(product);
    }
*/
    @Override
    public List<Product> getByProductNameMask(String productNameMask) {
        return productRepository.getByNameLike("%" + productNameMask + "%");
    }
}
