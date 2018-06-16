package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.function.BiFunction;

public final class ValueCalculator {

    private static final int SCALE = 6;

    public ValueCalculator() {
    }

    public static BigDecimal calculateValue(CalculableContainer calculableItemContainer) {
        return calculableItemContainer.calculableItems().stream()
                .reduce(BigDecimal.ZERO, addCalculableValue(), BigDecimal::add);
    }

    private static BiFunction<BigDecimal, Calculable, BigDecimal> addCalculableValue() {
        return (sum, calculable) -> sum.add(calculable.price().multiply(BigDecimal.valueOf(calculable.quantity())));
    }

    public static BigDecimal calculateValue(Exchangeable exchangeable) {
        return calculateValue(exchangeable.price(), exchangeable.exchangeRate()).setScale(0, RoundingMode.HALF_UP);
    }

    private static BigDecimal calculateValue(BigDecimal price, BigDecimal currencyRate) {
        return price.divide(currencyRate, 0, RoundingMode.HALF_UP);
    }

    public static BigDecimal calculateExchangeRate(BigDecimal exchangeRate) {
        return BigDecimal.ONE.divide(exchangeRate, SCALE, RoundingMode.HALF_UP);
    }

}
