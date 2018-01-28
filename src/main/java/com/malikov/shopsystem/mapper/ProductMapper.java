package com.malikov.shopsystem.mapper;

/**
 * @author Yurii Malikov
 */

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductCategory;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
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
import static java.math.RoundingMode.HALF_UP;
import static java.util.Collections.singleton;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    @Mapping(target = "productAggregated", expression = "java( source.getProductAggregator() != null )")
    @Mapping(source = "id", target = "productVariationId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.categories", target = "productCategories")
    @Mapping(source = "product.imageFileName", target = "productImage")
    @Mapping(source = "product.unlimited", target = "productQuantityUnlimited")
    @Mapping(source = "product.supplier", target = "productSupplier")
    public abstract ProductDto toDto(ProductVariation source);

    @AfterMapping
    protected void afterToDto(ProductVariation source, @MappingTarget ProductDto target) {
        target.setProductName(productVariationFullName(source));
        target.setProductPrice(calculateProductVariationPrice(source));
    }

    protected String productVariationFullName(ProductVariation source) {
        return source.getProduct().getName() + " " + source.getVariationValue().getName();
    }

    @Mapping(target = "productVariationId", constant = "0")
    @Mapping(target = "productAggregated", constant = "false")
    @Mapping(source = "imageFileName", target = "productImage")
    public abstract ProductDto toDto(Product source);

    @AfterMapping
    protected void afterToDto(Product source, @MappingTarget ProductDto target) {
        target.setProductPrice(calculateProductPrice(source));
    }

    @Mapping(target = "productPrice", ignore = true)
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "id", target = "productVariationId")
    public abstract ProductAutocompleteDto toAutocompleteDto(ProductVariation source);

    public abstract List<ProductAutocompleteDto> toAutocompleteDto(List<ProductVariation> source);

    @AfterMapping
    protected void afterToDto(ProductVariation source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productVariationPrice = calculateProductVariationPrice(source).setScale(0, HALF_UP);
        final String productVariationFullName = productVariationFullName(source);
        target.setLabel(productVariationFullName + " " + productVariationPrice);
        target.setProductName(productVariationFullName);
        target.setProductPrice(productVariationPrice);
    }

    @Mapping(target = "productVariationId", constant = "0")
    @Mapping(target = "productPrice", ignore = true)
    @Mapping(source = "id", target = "productId")
    public abstract ProductAutocompleteDto toAutocompleteDto(Product source);

    public Collection<ProductAutocompleteDto> toAutocompleteDtoSingleton(Product product) {
        return singleton(toAutocompleteDto(product));
    }

    @AfterMapping
    protected void afterToDto(Product source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productPrice = calculateProductPrice(source).setScale(0, HALF_UP);
        target.setLabel(source.getName() + " " + productPrice);
        target.setProductPrice(productPrice);
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
