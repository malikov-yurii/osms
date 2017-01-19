package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderTo {
    private Integer id;

    private String customerFirstName;

    private String customerLastName;

    private String productNamesOneString;

    public boolean isNew() {
        return id == null;
    }
    
    public OrderTo(@JsonProperty("id") Integer id,
                   @JsonProperty("customerFirstName") String customerFirstName,
                   @JsonProperty("customerLastName") String customerLastName,
                   @JsonProperty("productNamesOneString") String productNamesOneString
    ) {
        this.id = id;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.productNamesOneString = productNamesOneString;
    }

    public OrderTo() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustomerFirstName() {
        return customerFirstName;
    }

    public void setCustomerFirstName(String customerFirstName) {
        this.customerFirstName = customerFirstName;
    }

    public String getCustomerLastName() {
        return customerLastName;
    }

    public void setCustomerLastName(String customerLastName) {
        this.customerLastName = customerLastName;
    }

    public String getProductNamesOneString() {
        return productNamesOneString;
    }

    public void setProductNamesOneString(String productNamesOneString) {
        this.productNamesOneString = productNamesOneString;
    }

    @Override
    public String toString() {
        return "OrderTo{" +
                "id=" + id +
                ", customerFirstName='" + customerFirstName + '\'' +
                ", customerLastName='" + customerLastName + '\'' +
                ", productNamesOneString='" + productNamesOneString + '\'' +
                '}';
    }
}
