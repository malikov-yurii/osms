package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.Customer;

import java.util.Objects;

public class CustomerTestData {
    public static final Customer CUSTOMER_DROGOV = new Customer(
            1, "Alex", "Drogichinskij", "0674861352", "Ilichevsk", "3", "drogychynsky@gmail.com");
    public static final Customer CUSTOMER_GOLOV = new Customer(
            2, "Sergei", "Goltvjanskij", "0938754590", "Kiev", "31", "goltvyanskyy@gmail.com");
    public static final Customer CUSTOMER_DUNOV      = new Customer(
            3, "Elena", "Dunovskaya", "0984231204", "Sumy", "7", "katerina.tcherednichenko@yandex.ru");
    public static final Customer CUSTOMER_WITHOUT_ANY_ORDER      = new Customer(
            4, "WithNoOrderName", "WithNoOrderLastName", "0980000000", "ZeroTown", "0", "zero@yandex.ru");

    public static final ModelMatcher<Customer> MATCHER = ModelMatcher.of(Customer.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getLastName(), actual.getLastName())
                            && Objects.equals(expected.getPhoneNumber(), actual.getPhoneNumber())
                            && Objects.equals(expected.getCity(), actual.getCity())
                            && Objects.equals(expected.getPostOffice(), actual.getPostOffice())
                            && Objects.equals(expected.getEmail(), actual.getEmail())
                    )
    );
}
