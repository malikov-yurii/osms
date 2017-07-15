package com.malikov.shopsystem;


import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.model.VariationType;
import com.malikov.shopsystem.model.VariationValue;

import java.math.BigDecimal;
import java.util.Collections;

import static com.malikov.shopsystem.ProductCategoryTestData.*;

public class ProductTestData {

    public static final VariationType CONTAINER = new VariationType(1L, "Container");
    public static final VariationType LEAVES_QUANTITY = new VariationType(2L, "Leaves quantity");

    public static final VariationValue PLASTIC_BOTTLE_100ML = new VariationValue(1L, "0.1L (plastic)", CONTAINER);
    public static final VariationValue PLASTIC_BOTTLE_250ML = new VariationValue(2L, "0.25L (plastic)", CONTAINER);
    public static final VariationValue BOOKLET_100_LEAVES = new VariationValue(3L, "100 leaves", LEAVES_QUANTITY);
    public static final VariationValue BOOKLET_500_LEAVES = new VariationValue(4L, "500 leaves", LEAVES_QUANTITY);

    public static final Product SHELLAC_MANETTI = new Product(1L, "Shellac Manetti", new BigDecimal(235), true, 22, true,
            Collections.singleton(CATEGORY_LAKI));

    public static final Product POTAL_NAZIONALE = new Product(2L, "Potal Nazionale", new BigDecimal(385), false, 44, true,
            Collections.singleton(CATEGORY_POTAL_I_ZOLOTO));

    public static final Product FERRARIO_ROZOVYJ = new Product(3L, "Ferrario klej rozovyj", new BigDecimal(220), true, 33, true,
            Collections.singleton(CATEGORY_KLEI));

    public static final Product POTAL_KITAJ = new Product(4L, "Potal Kitaj", new BigDecimal(145), false, 11, true,
            Collections.singleton(CATEGORY_POTAL_I_ZOLOTO));

    public static final ProductVariation SHELLAC_MANETTI_100ML = new ProductVariation(1L, new BigDecimal(110), 88, SHELLAC_MANETTI, PLASTIC_BOTTLE_100ML);
    public static final ProductVariation SHELLAC_MANETTI_250ML = new ProductVariation(2L, new BigDecimal(235), 89, SHELLAC_MANETTI, PLASTIC_BOTTLE_250ML);
    public static final ProductVariation POTAL_NAZIONALE_100 = new ProductVariation(3L, new BigDecimal(385), 22, POTAL_NAZIONALE, BOOKLET_100_LEAVES);
    public static final ProductVariation POTAL_NAZIONALE_500 = new ProductVariation(4L, new BigDecimal(1745), 23, POTAL_NAZIONALE, BOOKLET_500_LEAVES);
    public static final ProductVariation FERRARIO_ROZOVYJ_100ML = new ProductVariation(5L, new BigDecimal(110), 44, FERRARIO_ROZOVYJ, PLASTIC_BOTTLE_100ML);
    public static final ProductVariation FERRARIO_ROZOVYJ_250ML = new ProductVariation(6L, new BigDecimal(220), 45, FERRARIO_ROZOVYJ, PLASTIC_BOTTLE_250ML);
    public static final ProductVariation POTAL_KITAJ_100 = new ProductVariation(7L, new BigDecimal(145), 55, POTAL_KITAJ, BOOKLET_100_LEAVES);

    public static final ProductVariation POTAL_KITAJ_500 = new ProductVariation(8L, new BigDecimal(585), 56, POTAL_KITAJ, BOOKLET_500_LEAVES);

}
