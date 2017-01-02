package com.malikov.shopsystem.model;

import java.util.Set;

public class Product extends NamedEntity{


    private float price;

    private int quantity;

    private Set<ProductCategory> categories;

//    private int productCode;

//    private boolean unlimited;

//    private boolean priceInEuro;
}
