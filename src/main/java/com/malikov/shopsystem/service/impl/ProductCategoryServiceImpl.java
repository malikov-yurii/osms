package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import com.malikov.shopsystem.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFoundById;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    public ProductCategory create(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public void update(ProductCategory productCategory) {
        checkNotFoundById(productCategoryRepository.save(productCategory), productCategory.getId());
    }

    @Override
    public ProductCategory get(Long id) {
        return checkNotFoundById(productCategoryRepository.findOne(id), id);
    }

    @Override
    public void delete(Long id) {
        productCategoryRepository.delete(id);
    }

    @Override
    public List<ProductCategory> getAll() {
        return productCategoryRepository.findAll(new PageRequest(0, 200))
                .getContent();
    }
}
