package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

import static com.malikov.shopsystem.CustomerTestData.*;
import static com.malikov.shopsystem.ProductTestData.*;
import static com.malikov.shopsystem.UserTestData.ADMIN;

public class OrderTestData {

    public static final Order ORDER_1 = new Order(1, CUSTOMER_GOLOV, ADMIN,
            PaymentType.PB,
            OrderStatus.WFP,
            null,
            LocalDate.of(2016, 9, 15),
            Arrays.asList(
                    new OrderItem(1, POTAL_NAZIONALE, POTAL_NAZIONALE_100, POTAL_NAZIONALE.getName(), POTAL_NAZIONALE_100.getPrice(), 1),
                    new OrderItem(2, FERRARIO_ROZOVYJ, FERRARIO_ROZOVYJ_250ML, FERRARIO_ROZOVYJ.getName(), FERRARIO_ROZOVYJ_250ML.getPrice(), 2)
            ));
    public static final Order ORDER_2 = new Order(2, CUSTOMER_GOLOV, ADMIN,
            PaymentType.NP,
            OrderStatus.SHP,
            null,
            LocalDate.of(2016, 11, 17),
            Arrays.asList(
                    new OrderItem(3, SHELLAC_MANETTI, SHELLAC_MANETTI_250ML, SHELLAC_MANETTI.getName(), SHELLAC_MANETTI_250ML.getPrice(), 3),
                    new OrderItem(4, POTAL_KITAJ, POTAL_KITAJ_100, POTAL_KITAJ.getName(), POTAL_KITAJ_100.getPrice(), 4)
            ));

    public static final Order ORDER_3 = new Order(3, CUSTOMER_DROGOV, ADMIN,
            PaymentType.PB,
            OrderStatus.SHP,
            null,
            LocalDate.of(2016, 10, 11),
            Collections.singletonList(
                    new OrderItem(5, POTAL_KITAJ, POTAL_KITAJ_100, POTAL_KITAJ.getName(), POTAL_KITAJ_100.getPrice(), 5)
            ));

    public static final Order ORDER_4 = new Order(4, CUSTOMER_DUNOV, ADMIN,
            PaymentType.NP,
            OrderStatus.SHP,
            null,
            LocalDate.of(2016, 12, 22),
            Arrays.asList(
                    new OrderItem(6, SHELLAC_MANETTI, SHELLAC_MANETTI_250ML, SHELLAC_MANETTI.getName(), SHELLAC_MANETTI_250ML.getPrice(), 6),
                    new OrderItem(7, POTAL_NAZIONALE, POTAL_NAZIONALE_100, POTAL_NAZIONALE.getName(), POTAL_NAZIONALE_100.getPrice(), 7),
                    new OrderItem(8, FERRARIO_ROZOVYJ, FERRARIO_ROZOVYJ_250ML, FERRARIO_ROZOVYJ.getName(), FERRARIO_ROZOVYJ_250ML.getPrice(), 8)
            ));

    public static final Order ORDER_5 = new Order(5, CUSTOMER_DROGOV, ADMIN,
            PaymentType.PB,
            OrderStatus.WFP,
            null,
            LocalDate.of(2016, 2, 22),
            Collections.singletonList(
                    new OrderItem(9, BITUM_DIVOLO, null, BITUM_DIVOLO.getName(), BITUM_DIVOLO.getPrice(), 1)
            ));


    public static final ModelMatcher<Order> MATCHER = ModelMatcher.of(Order.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getCustomer(), actual.getCustomer())
                            && Objects.equals(expected.getUser(), actual.getUser())
                            && Objects.equals(expected.getPaymentType(), actual.getPaymentType())
                            && Objects.equals(expected.getStatus(), actual.getStatus())
                            && Objects.equals(expected.getComment(), actual.getComment())
                            && Objects.equals(expected.getDatePlaced(), actual.getDatePlaced())
                            && Objects.equals(expected.getOrderItems(), actual.getOrderItems())
                    )
    );
}
