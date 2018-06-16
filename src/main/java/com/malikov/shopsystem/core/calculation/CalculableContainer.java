package com.malikov.shopsystem.core.calculation;

import java.math.BigDecimal;
import java.util.Collection;

public interface CalculableContainer {

    Collection<? extends Calculable> calculableItems();
    BigDecimal totalValue();

}
