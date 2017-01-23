package com.malikov.shopsystem.to;

import java.io.Serializable;

//@RestResource(exported = false)
public class ProductTo implements Serializable {

    private Integer id;

    private String name;

    private Integer price;

    private Integer quantity;

    public ProductTo(
            Integer id,
            String name,
            Integer price,
            Integer quantity
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public ProductTo() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isNew() {
        return id == null;
    }

    @Override
    public String toString() {
        return "ProductTo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }
}
