package com.malikov.shopsystem.dto;

public class CustomerAutocompleteDto {

    // TODO: 3/25/2017  get rid of label  - use concatenation instead
    private String label;

    private Long customerId;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String city;

    private String postOffice;

    public CustomerAutocompleteDto(
            String label,
            Long customerId,
            String firstName, String lastName, String phoneNumber, String city, String postOffice) {
        this.label = label;
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.postOffice = postOffice;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostOffice() {
        return postOffice;
    }

    public void setPostOffice(String postOffice) {
        this.postOffice = postOffice;
    }

}
