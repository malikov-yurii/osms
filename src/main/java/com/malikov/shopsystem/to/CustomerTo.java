package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CustomerTo implements Serializable {

    private Integer id;

    private String name;

    private String lastName;

    private String phoneNumber;

    private String city;

    private String novaPoshta;

    private String email;

    public CustomerTo(@JsonProperty("id") Integer id,
                      @JsonProperty("name") String name,
                      @JsonProperty("lastName") String lastName,
                      @JsonProperty("phoneNumber") String phoneNumber,
                      @JsonProperty("city") String city,
                      @JsonProperty("novaPoshta") String novaPoshta,
                      @JsonProperty("email") String email
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.novaPoshta = novaPoshta;
        this.email = email;
    }

    public CustomerTo() {
    }

    public boolean isNew() {
        return id == null;
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

    public String getNovaPoshta() {
        return novaPoshta;
    }

    public void setNovaPoshta(String novaPoshta) {
        this.novaPoshta = novaPoshta;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "CustomerTo{" +
                "id=" + id +
                ", firstName='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", novaPoshta='" + novaPoshta + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
