package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.function.BiFunction;

import static java.math.BigDecimal.valueOf;
import static java.math.RoundingMode.HALF_UP;

public final class ValueCalculator {

    private static final int SCALE = 6;

    private ValueCalculator() {
    }

    public static BigDecimal calculate(Exchangeable exchangeable) {
        return calculateValue(exchangeable.getPrice(), exchangeable.getExchangeRate()).setScale(0, HALF_UP);
    }

    public static BigDecimal calculate(CalculableContainer calculableItemContainer) {
        return calculableItemContainer.getCalculableItems().stream()
                .reduce(BigDecimal.ZERO, calcAndAddOrderLineTotal(), BigDecimal::add);
    }

    private static BiFunction<BigDecimal, Calculable, BigDecimal> calcAndAddOrderLineTotal() {
        return (sum, ordLine) -> sum.add(ordLine.getPrice().multiply(valueOf(ordLine.getQuantity())));
    }

    private static BigDecimal calculateValue(BigDecimal price, BigDecimal currencyRate) {
        return price.divide(currencyRate, 0, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateExchangeRate(BigDecimal exchangeRate) {
        return BigDecimal.ONE.divide(exchangeRate, SCALE, RoundingMode.HALF_UP);
    }

}
