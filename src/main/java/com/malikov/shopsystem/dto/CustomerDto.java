package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.HasId;

import java.io.Serializable;

public class CustomerDto implements Serializable, HasId {

    private Long customerId;

    private String customerFirstName;

    private String customerLastName;

    private String customerPhoneNumber;

    private String destinationCity;

    private String destinationPostOffice;

    private String custonerEmail;

    private String customerNote;

    public CustomerDto(Long customerId,
                       String customerFirstName,
                       String customerLastName,
                       String customerPhoneNumber,
                       String destinationCity,
                       String destinationPostOffice,
                       String custonerEmail,
                       String customerNote
    ) {
        this.customerId = customerId;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerPhoneNumber = customerPhoneNumber;
        this.destinationCity = destinationCity;
        this.destinationPostOffice = destinationPostOffice;
        this.custonerEmail = custonerEmail;
        this.customerNote = customerNote;
    }

    public CustomerDto() {
    }

    public boolean isNew() {
        return customerId == null;
    }

    public Long getId() {
        return customerId;
    }

    public void setId(Long id) {
        this.customerId = id;
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

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getDestinationPostOffice() {
        return destinationPostOffice;
    }

    public void setDestinationPostOffice(String destinationPostOffice) {
        this.destinationPostOffice = destinationPostOffice;
    }

    public String getCustonerEmail() {
        return custonerEmail;
    }

    public void setCustonerEmail(String custonerEmail) {
        this.custonerEmail = custonerEmail;
    }

    public String getCustomerNote() {
        return customerNote;
    }

    public void setCustomerNote(String customerNote) {
        this.customerNote = customerNote;
    }

    @Override
    public String toString() {
        return "CustomerDto{" +
                "id=" + customerId +
                ", firstName='" + customerFirstName + '\'' +
                ", lastName='" + customerLastName + '\'' +
                ", phoneNumber='" + customerPhoneNumber + '\'' +
                ", city='" + destinationCity + '\'' +
                ", postOffice='" + destinationPostOffice + '\'' +
                ", email='" + custonerEmail + '\'' +
                '}';
    }

}
