package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;

public interface Calculable {

    BigDecimal getPrice();
    Integer getQuantity();

}
