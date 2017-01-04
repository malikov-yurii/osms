package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.Order;

import java.util.Objects;

import static com.malikov.shopsystem.CustomerTestData.*;
import static com.malikov.shopsystem.ProductTestData.*;
import static com.malikov.shopsystem.UserTestData.*;

public class OrderTestData {

    public static final Order ORDER_1 = new Order(1, CUSTOMER_GOLOTVJANSKIJ, ADMIN, POTAL_NAZIONALE, FERRARIO_ROZOVYJ);
    public static final Order ORDER_2 = new Order(2, CUSTOMER_GOLOTVJANSKIJ, ADMIN, SHELLAC_MANETTI, POTAL_KITAJ);
    public static final Order ORDER_3 = new Order(3, CUSTOMER_DROGICHINSKIJ, ADMIN, POTAL_KITAJ);
    public static final Order ORDER_4 = new Order(4, CUSTOMER_DUNOVSKAJA, ADMIN, POTAL_NAZIONALE, FERRARIO_ROZOVYJ, SHELLAC_MANETTI);

    public static final ModelMatcher<Order> MATCHER = ModelMatcher.of(Order.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getCustomer(), actual.getCustomer())
                            && Objects.equals(expected.getUser(), actual.getUser())
                            && Objects.equals(expected.getProducts(), actual.getProducts())
                    )
    );
}
