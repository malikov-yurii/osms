package ua.com.malikov.shopsystem.model;

import java.util.Set;

public class Order extends BaseEntity{

    private Set<Product> products;

    private Customer customer;

    private User user;



}
