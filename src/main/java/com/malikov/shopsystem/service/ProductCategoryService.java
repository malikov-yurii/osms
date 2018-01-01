package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public ProductCategory create(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    public void update(ProductCategory productCategory) {
        checkNotFoundById(productCategoryRepository.save(productCategory), productCategory.getId());
    }

    public ProductCategory get(Long id) {
        return checkNotFoundById(productCategoryRepository.findOne(id), id);
    }

    public void delete(Long id) {
        productCategoryRepository.delete(id);
    }

    public List<ProductCategory> getAll() {
        return productCategoryRepository.findAll(new PageRequest(0, 200))
                .getContent();
    }

    public List<String> getAllNames() {
        return productCategoryRepository.findAll(new PageRequest(0, 200))
                .getContent().stream()
                .map(ProductCategory::getName)
                .collect(Collectors.toList());
    }
}
