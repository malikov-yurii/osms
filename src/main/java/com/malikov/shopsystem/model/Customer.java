package com.malikov.shopsystem.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Objects;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_customers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone_number",
                name = "customers_phone_number_idx")
})
public class Customer extends NamedEntity {

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "nova_poshta")
    private String postOffice;

    @Column(name = "email")
    private String email;

    @Column(name = "note")
    private String note;

    @OneToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "parent_id")
    private Customer parent;

    public Customer() {
    }

    public Customer(Customer c) {
        this(c.getId(), c.getName(), c.getLastName(), c.getPhoneNumber(),
                c.getCity(), c.getPostOffice(), c.getEmail(), c.getNote());
    }

    public Customer(Long id, String name, String lastName, String phoneNumber,
                    String city, String postOffice, String email, String note) {
        super(id, name);
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.postOffice = postOffice;
        this.email = email;
        this.note = note;
    }

    public Customer(String name, String lastName, String phoneNumber,
                    String city, String postOffice, String email, String note) {
        this(null, name, lastName, phoneNumber, city, postOffice, email, note);
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

    public Customer getParent() {
        return parent;
    }

    public void setParent(Customer parent) {
        this.parent = parent;
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
        return Objects.hash(super.hashCode(), lastName, phoneNumber, city,
                postOffice, email);
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
