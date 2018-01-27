package com.malikov.shopsystem.util;

import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * @author Yurii Malikov
 */
public class CalculateProductPriceUtil {


    public static BigDecimal calculateProductVariationPrice(ProductVariation productVariation) {
        return calcPrice(productVariation.getPrice(), productVariation.getProduct().getCurrency().getCurrencyRate());
    }

    public static BigDecimal calculateProductPrice(Product product) {
        return calcPrice(product.getPrice(), product.getCurrency().getCurrencyRate());
    }

    private static BigDecimal calcPrice(BigDecimal price, BigDecimal currencyRate) {
        return price.divide(currencyRate, 0, RoundingMode.HALF_UP);
    }
}
