package com.malikov.shopsystem;


import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.Product;

import java.util.Objects;

import static com.malikov.shopsystem.ProductCategoryTestData.*;

public class ProductTestData {

    public static final Product SHELLAC_MANETTI = new Product(1, "Shellac Manetti", 235, 22, CATEGORY_LAKI);
    public static final Product POTAL_NAZIONALE = new Product(2, "Potal Nazionale", 385, 11, CATEGORY_POTAL_I_ZOLOTO);
    public static final Product FERRARIO_ROZOVYJ = new Product(3, "Ferrario klej rozovyj", 220, 33, CATEGORY_KLEI);
    public static final Product POTAL_KITAJ = new Product(4, "Potal Kitaj", 145, 11, CATEGORY_POTAL_I_ZOLOTO);

    public static final ModelMatcher<Product> MATCHER = ModelMatcher.of(Product.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPrice(), actual.getPrice())
                            && Objects.equals(expected.getQuantity(), actual.getQuantity())
                            && Objects.equals(expected.getCategories(), actual.getCategories())
                    )
    );
}
