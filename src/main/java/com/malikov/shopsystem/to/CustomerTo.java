package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CustomerTo implements Serializable {

    private Long id;

    private String name;

    private String lastName;

    private String phoneNumber;

    private String city;

    private String postOffice;

    private String email;

    private String note;

    public CustomerTo(@JsonProperty("id") Long id,
                      @JsonProperty("name") String name,
                      @JsonProperty("lastName") String lastName,
                      @JsonProperty("phoneNumber") String phoneNumber,
                      @JsonProperty("city") String city,
                      @JsonProperty("postOffice") String postOffice,
                      @JsonProperty("email") String email,
                      @JsonProperty("note") String note
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.postOffice = postOffice;
        this.email = email;
        this.note = note;
    }

    public CustomerTo() {
    }

    public boolean isNew() {
        return id == null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "CustomerTo{" +
                "id=" + id +
                ", firstName='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", postOffice='" + postOffice + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
