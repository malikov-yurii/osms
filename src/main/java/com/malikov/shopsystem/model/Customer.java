package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.util.Objects;

@NamedQueries({
        @NamedQuery(name = Customer.DELETE, query = "DELETE FROM Customer c WHERE c.id=:id"),
        @NamedQuery(name = Customer.BY_NAME, query = "SELECT c FROM Customer c WHERE c.name=:name"),
        @NamedQuery(name = Customer.BY_LAST_NAME, query = "SELECT c FROM Customer c WHERE c.lastName=:lastName"),
        @NamedQuery(name = Customer.BY_FIRST_NAME_MASK, query = "SELECT c FROM Customer c WHERE lower(c.name) LIKE lower(:firstNameMask)"),
        @NamedQuery(name = Customer.BY_LAST_NAME_MASK, query = "SELECT c FROM Customer c WHERE lower(c.lastName) LIKE lower(:lastNameMask)"),
        @NamedQuery(name = Customer.BY_PHONE_NUMBER_MASK, query = "SELECT c FROM Customer c WHERE c.phoneNumber LIKE :phoneNumberMask"),
        @NamedQuery(name = Customer.BY_CITY_MASK, query = "SELECT c FROM Customer c WHERE lower(c.city) LIKE lower(:cityMask)"),
        @NamedQuery(name = Customer.BY_CITY, query = "SELECT c FROM Customer c WHERE c.city=:city"),
        @NamedQuery(name = Customer.BY_EMAIL, query = "SELECT c FROM Customer c WHERE c.email=:email"),
        @NamedQuery(name = Customer.BY_PHONE_NUMBER, query = "SELECT c FROM Customer c WHERE c.phoneNumber=:phoneNumber"),
        @NamedQuery(name = Customer.ALL_SORTED, query = "SELECT c FROM Customer c ORDER BY c.lastName"),
})
@Entity
@Table(name = "osms_customers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone_number", name = "customers_phone_number_idx"),
        @UniqueConstraint(columnNames = "email", name = "customers_email_idx")
})
public class Customer extends NamedEntity {

    public static final String DELETE = "Customer.delete";
    public static final String ALL_SORTED = "Customer.getAllSorted";
    public static final String BY_EMAIL = "Customer.getByEmail";
    public static final String BY_PHONE_NUMBER = "Customer.getByPhone";
    public static final String BY_NAME = "Customer.getByName";
    public static final String BY_LAST_NAME = "Customer.getByLastName";
    public static final String BY_FIRST_NAME_MASK = "Customer.getByFirstNameMask";
    public static final String BY_LAST_NAME_MASK = "Customer.getByLastNameMask";
    public static final String BY_PHONE_NUMBER_MASK = "Customer.getByPhoneNumberMask";
    public static final String BY_CITY_MASK = "Customer.getByCityMask";
    public static final String BY_CITY = "Customer.getByCity";

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "nova_poshta")
    private String postOffice;

    @Column(name = "email", unique = true)
    private String email;

    public Customer() {
    }

    public Customer(Integer id, String name, String lastName, String phoneNumber, String city, String postOffice, String email) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.postOffice = postOffice;
        this.email = email;
    }

    public Customer(String name, String lastName, String phoneNumber, String city, String postOffice, String email) {
        this(null, name, lastName, phoneNumber, city, postOffice, email);
    }

    public Customer(Customer c) {
        this(c.getId(), c.getName(), c.getLastName(), c.getPhoneNumber(), c.getCity(), c.getPostOffice(), c.getEmail());
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;
        if (!super.equals(o)) return false;
        Customer customer = (Customer) o;
        return Objects.equals(lastName, customer.lastName) &&
                Objects.equals(phoneNumber, customer.phoneNumber) &&
                Objects.equals(city, customer.city) &&
                Objects.equals(postOffice, customer.postOffice) &&
                Objects.equals(email, customer.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), lastName, phoneNumber, city, postOffice, email);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", postOffice='" + postOffice + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
