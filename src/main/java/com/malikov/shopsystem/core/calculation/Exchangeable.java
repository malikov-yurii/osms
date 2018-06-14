package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;

public interface Exchangeable {

    BigDecimal getPrice();
    BigDecimal getExchangeRate();

}
