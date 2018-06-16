package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;

public interface Calculable {

    BigDecimal price();
    Integer quantity();

}
