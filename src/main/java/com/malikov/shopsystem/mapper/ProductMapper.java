package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductCategory;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.dto.ProductDto;
import com.malikov.shopsystem.dto.ProductPage;
import org.apache.commons.collections.CollectionUtils;
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

@Mapper
public abstract class ProductMapper {

    @Mapping(target = "productAggregated", expression = "java( source.getProductAggregator() != null )")
    @Mapping(source = "id", target = "productVariationId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "quantity", target = "productQuantity")
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

    @Mapping(source = "id", target = "productId")
    @Mapping(source = "name", target = "productName")
    @Mapping(source = "quantity", target = "productQuantity")
    @Mapping(source = "categories", target = "productCategories")
    @Mapping(source = "unlimited", target = "productQuantityUnlimited")
    @Mapping(source = "supplier", target = "productSupplier")
    @Mapping(target = "productAggregated", constant = "false")
    @Mapping(target = "productVariationId", constant = "0")
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

    @AfterMapping
    protected void afterToDto(ProductVariation source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productVariationPrice = calculateProductVariationPrice(source);
        final String productVariationFullName = productVariationFullName(source);
        target.setLabel(productVariationFullName + " " + productVariationPrice);
        target.setProductName(productVariationFullName);
        target.setProductPrice(productVariationPrice);
    }

    public abstract List<ProductAutocompleteDto> toAutocompleteDto(List<ProductVariation> source);

    @Mapping(target = "productVariationId", constant = "0")
    @Mapping(target = "productPrice", ignore = true)
    @Mapping(source = "id", target = "productId")
    @Mapping(source = "name", target = "productName")
    public abstract ProductAutocompleteDto toAutocompleteDto(Product source);

    @AfterMapping
    protected void afterToDto(Product source, @MappingTarget ProductAutocompleteDto target) {
        final BigDecimal productPrice = calculateProductPrice(source);
        target.setLabel(source.getName() + " " + productPrice);
        target.setProductPrice(productPrice);
    }

    public Collection<ProductAutocompleteDto> toAutocompleteDtoSingleton(Product product) {
        return singleton(toAutocompleteDto(product));
    }

    public ProductPage toPage(org.springframework.data.domain.Page<Product> source) {
        ProductPage target = new ProductPage();
        List<ProductDto> allProducts = new ArrayList<>();

        for (Product product : source.getContent()) {
            if (product.getCategories().size() != 0) {
                allProducts.addAll(toDtos(product));
            }
        }

        target.setContent(allProducts);
        target.setTotalElements(source.getTotalElements());
        target.setTotalPages(source.getTotalPages());

        return target;
    }

    protected List<ProductDto> toDtos(Product product) {
        List<ProductDto> products = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(product.getVariations())) {
            products.addAll(toDtos(product.getVariations()));
        } else {
            products.add(toDto(product));
        }

        return products;
    }

    private List<ProductDto> toDtos(List<ProductVariation> productVariations) {
        return productVariations
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    protected String toString(ProductCategory category) {
        return category.getName();
    }

}
