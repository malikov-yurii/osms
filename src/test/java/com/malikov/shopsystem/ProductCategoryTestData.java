package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.domain.ProductCategory;

import java.util.Objects;

public class ProductCategoryTestData {

    public static final ProductCategory CATEGORY_LAKI = new ProductCategory(1L, "Laki");
    public static final ProductCategory CATEGORY_KLEI = new ProductCategory(2L, "Klei");
    public static final ProductCategory CATEGORY_POTAL_I_ZOLOTO = new ProductCategory(3L, "Potal i zoloto");

    public static final ModelMatcher<ProductCategory> MATCHER = ModelMatcher.of(ProductCategory.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                    )
    );
}
