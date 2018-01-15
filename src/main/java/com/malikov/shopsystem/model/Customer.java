package com.malikov.shopsystem.model;

import com.malikov.shopsystem.HasId;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_customers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone_number",
                name = "customers_phone_number_idx")
})
public class Customer implements HasId{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "name")
    private String name;

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

    public Customer getParent() {
        return parent;
    }

    public void setParent(Customer parent) {
        this.parent = parent;
    }
}
