package com.malikov.shopsystem.mapper;

/**
 * @author Yurii Malikov
 */

import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductCategory;
import com.malikov.shopsystem.domain.ProductVariation;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice;
import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice;
import static java.util.Collections.singleton;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    @Mapping(target = "aggregated", expression = "java( source.getProductAggregator() != null )")
    @Mapping(source = "id", target = "variationId")
    @Mapping(source = "product.id", target = "id")
    @Mapping(source = "product.categories", target = "categories")
    @Mapping(source = "product.imageFileName", target = "image")
    @Mapping(source = "product.unlimited", target = "unlimited")
    @Mapping(source = "product.supplier", target = "supplier")
    public abstract ProductDto toDto(ProductVariation source);

    @AfterMapping
    protected void afterToDto(ProductVariation source, @MappingTarget ProductDto target) {
        target.setName(productVariationFullName(source));
        target.setPrice(calculateProductVariationPrice(source));
    }

    protected String productVariationFullName(ProductVariation source) {
        return source.getProduct().getName() + " " + source.getVariationValue().getName();
    }

    @Mapping(target = "variationId", constant = "0")
    @Mapping(target = "aggregated", constant = "false")
    @Mapping(source = "imageFileName", target = "image")
    public abstract ProductDto toDto(Product source);

    @AfterMapping
    protected void afterToDto(Product source, @MappingTarget ProductDto target) {
        target.setPrice(calculateProductPrice(source));
    }

    @Mapping(target = "price", ignore = true)
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "id", target = "productVariationId")
    public abstract ProductAutocompleteDto toAutocompleteDto(ProductVariation source);

    public abstract List<ProductAutocompleteDto> toAutocompleteDto(List<ProductVariation> source);

    @AfterMapping
    protected void afterToDto(ProductVariation source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productVariationPrice = calculateProductVariationPrice(source);
        final String productVariationFullName = productVariationFullName(source);
        target.setLabel(productVariationFullName + productVariationPrice);
        target.setName(productVariationFullName);
        target.setPrice(productVariationPrice);
    }

    @Mapping(target = "price", ignore = true)
    @Mapping(source = "id", target = "productId")
    @Mapping(target = "productVariationId", constant = "0")
    public abstract ProductAutocompleteDto toAutocompleteDto(Product source);

    public Collection<ProductAutocompleteDto> toAutocompleteDtoSingleton(Product product) {
        return singleton(toAutocompleteDto(product));
    }

    @AfterMapping
    protected void afterToDto(Product source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productPrice = calculateProductPrice(source);
        target.setLabel(source.getName() + " " + productPrice);
        target.setPrice(productPrice);
    }

    public ProductPage toPage(org.springframework.data.domain.Page<Product> source) {

        ProductPage target = new ProductPage();
        List<ProductDto> allProducts = new ArrayList<>();

        for (Product product : source.getContent()) {
            if (product.getCategories().size() != 0) {
                allProducts.addAll(getDtosFrom(product));
            }
        }

        target.setContent(allProducts);
        target.setTotalElements(source.getTotalElements());
        target.setTotalPages(source.getTotalPages());

        return target;
    }

    protected List<ProductDto> getDtosFrom(Product product) {

        List<ProductDto> products = new ArrayList<>();

        if (product.getHasVariations()) {
            products.addAll(product.getVariations()
                    .stream()
                    .map(this::toDto)
                    .collect(Collectors.toList()));
        } else {
            products.add(this.toDto(product));
        }

        return products;
    }

    protected String toString(ProductCategory category) {
        return category.getName();
    }

}
