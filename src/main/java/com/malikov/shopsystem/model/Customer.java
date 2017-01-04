package com.malikov.shopsystem.model;

import javax.persistence.*;

@NamedQueries({
        @NamedQuery(name = Customer.DELETE, query = "DELETE FROM Customer c WHERE c.id=:id"),
        @NamedQuery(name = Customer.BY_NAME, query = "SELECT c FROM Customer c WHERE c.name=:name"),
        @NamedQuery(name = Customer.BY_LAST_NAME, query = "SELECT c FROM Customer c WHERE c.lastName=:lastName"),
        @NamedQuery(name = Customer.BY_CITY, query = "SELECT c FROM Customer c WHERE c.city=:city"),
        @NamedQuery(name = Customer.BY_EMAIL, query = "SELECT c FROM Customer c WHERE c.email=:email"),
        @NamedQuery(name = Customer.BY_PHONE, query = "SELECT c FROM Customer c WHERE c.phoneNumber=:phoneNumber"),
        @NamedQuery(name = Customer.ALL_SORTED, query = "SELECT c FROM Customer c ORDER BY c.lastName"),
})
@Entity
@Table(name = "customers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone_number", name = "customers_phone_number_idx"),
        @UniqueConstraint(columnNames = "email", name = "customers_email_idx")
})
public class Customer extends NamedEntity {

    public static final String DELETE = "Customer.delete";
    public static final String ALL_SORTED = "Customer.getAllSorted";
    public static final String BY_EMAIL = "Customer.getByEmail";
    public static final String BY_PHONE = "Customer.getByPhone";
    public static final String BY_NAME = "Customer.getByName";
    public static final String BY_LAST_NAME = "Customer.getByLastName";
    public static final String BY_CITY = "Customer.getByCity";

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "nova_poshta")
    private String novaPoshtaDepartmentNumber;

    @Column(name = "email", unique = true)
    private String email;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;
        if (!super.equals(o)) return false;

        Customer customer = (Customer) o;

        if (lastName != null ? !lastName.equals(customer.lastName) : customer.lastName != null) return false;
        if (phoneNumber != null ? !phoneNumber.equals(customer.phoneNumber) : customer.phoneNumber != null)
            return false;
        if (city != null ? !city.equals(customer.city) : customer.city != null) return false;
        if (novaPoshtaDepartmentNumber != null ? !novaPoshtaDepartmentNumber.equals(customer.novaPoshtaDepartmentNumber) : customer.novaPoshtaDepartmentNumber != null)
            return false;
        return email != null ? email.equals(customer.email) : customer.email == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (city != null ? city.hashCode() : 0);
        result = 31 * result + (novaPoshtaDepartmentNumber != null ? novaPoshtaDepartmentNumber.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        return result;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNovaPoshtaDepartmentNumber() {
        return novaPoshtaDepartmentNumber;
    }

    public void setNovaPoshtaDepartmentNumber(String novaPoshtaDepartmentNumber) {
        this.novaPoshtaDepartmentNumber = novaPoshtaDepartmentNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", novaPoshtaDepartmentNumber='" + novaPoshtaDepartmentNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
