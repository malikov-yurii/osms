package com.malikov.shopsystem;


import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.model.VariationType;
import com.malikov.shopsystem.model.VariationValue;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

import static com.malikov.shopsystem.ProductCategoryTestData.*;

public class ProductTestData {

    public static final VariationType CONTAINER = new VariationType(1, "Container");
    public static final VariationType LEAVES_QUANTITY = new VariationType(2, "Leaves quantity");

    public static final VariationValue PLASTIC_BOTTLE_100ML = new VariationValue(1, "0.1L (plastic)", CONTAINER);
    public static final VariationValue PLASTIC_BOTTLE_250ML = new VariationValue(2, "0.25L (plastic)", CONTAINER);
    public static final VariationValue BOOKLET_100_LEAVES = new VariationValue(3, "100 leaves", LEAVES_QUANTITY);
    public static final VariationValue BOOKLET_500_LEAVES = new VariationValue(4, "500 leaves", LEAVES_QUANTITY);

    public static final ProductVariation SHELLAC_MANETTI_100ML = new ProductVariation(1, 110, 88, PLASTIC_BOTTLE_100ML);
    public static final ProductVariation SHELLAC_MANETTI_250ML = new ProductVariation(2, 235, 89, PLASTIC_BOTTLE_250ML);
    public static final ProductVariation POTAL_NAZIONALE_100 = new ProductVariation(3, 385, 22, BOOKLET_100_LEAVES);
    public static final ProductVariation POTAL_NAZIONALE_500 = new ProductVariation(4, 1745, 23, BOOKLET_500_LEAVES);
    public static final ProductVariation FERRARIO_ROZOVYJ_100ML = new ProductVariation(5, 110, 44, PLASTIC_BOTTLE_100ML);
    public static final ProductVariation FERRARIO_ROZOVYJ_250ML = new ProductVariation(6, 220, 45, PLASTIC_BOTTLE_250ML);
    public static final ProductVariation POTAL_KITAJ_100 = new ProductVariation(7, 145, 55, BOOKLET_100_LEAVES);
    public static final ProductVariation POTAL_KITAJ_500 = new ProductVariation(8, 585, 56, BOOKLET_500_LEAVES);

    public static final Product SHELLAC_MANETTI = new Product(1, "Shellac Manetti", 235, 1, 22, 1,
            Collections.singleton(CATEGORY_LAKI), Arrays.asList(SHELLAC_MANETTI_100ML, SHELLAC_MANETTI_250ML));

    public static final Product POTAL_NAZIONALE = new Product(2, "Potal Nazionale", 385, 0, 44, 1,
            Collections.singleton(CATEGORY_POTAL_I_ZOLOTO), Arrays.asList(POTAL_NAZIONALE_100, POTAL_NAZIONALE_500));

    public static final Product FERRARIO_ROZOVYJ = new Product(3, "Ferrario klej rozovyj", 220, 1, 33, 1,
            Collections.singleton(CATEGORY_KLEI), Arrays.asList(FERRARIO_ROZOVYJ_100ML, FERRARIO_ROZOVYJ_250ML));

    public static final Product POTAL_KITAJ = new Product(4, "Potal Kitaj", 145, 0, 11, 1,
            Collections.singleton(CATEGORY_POTAL_I_ZOLOTO), Arrays.asList(POTAL_KITAJ_100, POTAL_KITAJ_500));

    public static final Product BITUM_DIVOLO = new Product(5, "Divolo Bitum Vosk", 570, 0, 1, 0,
            Collections.singleton(CATEGORY_LAKI), null);

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
