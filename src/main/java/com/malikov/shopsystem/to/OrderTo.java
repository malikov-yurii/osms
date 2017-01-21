package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.util.serializers.LocalDateSerializer;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrderTo {

    private Integer id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String city;

    private String novaPoshta;

    private Integer totalSum;

    private PaymentType paymentType;

    private LocalDate datePlaced;

    private Timestamp timestamp;

    private OrderStatus status;

    private List<ProductToForOrderTo> products;

    @JsonCreator
    public OrderTo(
            @JsonProperty("id")Integer id
            , @JsonProperty("first_name")String firstName
            , @JsonProperty("last_name")String lastName
            , @JsonProperty("phone")String phoneNumber
            , @JsonProperty("city")String city
            , @JsonProperty("nova_poshta")String novaPoshta
            , @JsonProperty("total_sum")String totalSum
            , @JsonProperty("payment_type")PaymentType paymentType
            , @JsonProperty("date") LocalDate datePlaced
            , @JsonProperty("timestamp")Timestamp timestamp
            , @JsonProperty("status") OrderStatus status
            ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.novaPoshta = novaPoshta;
        this.paymentType = paymentType;
        this.datePlaced = datePlaced;
        this.status = status;
        products = new ArrayList<>();
        this.totalSum = 0;
    }

    public OrderTo(
            Integer id
            ,String firstName
            ,String lastName
            ,String phoneNumber
            ,String city
            ,String novaPoshta
            ,PaymentType paymentType
            ,LocalDate datePlaced
            ,OrderStatus status
            ,List<ProductToForOrderTo> products
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.novaPoshta = novaPoshta;
        this.paymentType = paymentType;
        this.datePlaced = datePlaced;
        this.status = status;
        this.totalSum = 0;
        this.products = products;
    }

    public OrderTo(
            Integer id
            ,String firstName
            ,String lastName
            ,String phoneNumber
            ,String city
            ,String novaPoshta
            ,PaymentType paymentType
            ,LocalDate datePlaced
            ,OrderStatus status
    ) {
        this(id, firstName, lastName, phoneNumber, city, novaPoshta, paymentType, datePlaced, status, new ArrayList<>());
        this.totalSum = 0;

    }

    public OrderTo() {
    }

    @JsonIgnore
    public boolean isNew() {
        return id == null;
    }

    public void addProduct(ProductToForOrderTo productToForOrderTo) {
        products.add(productToForOrderTo);
        this.totalSum += productToForOrderTo.getPrice();
    }

    @JsonProperty("id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonProperty("first_name")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonProperty("last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @JsonProperty("phone")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonProperty("city")
    public String getCity() {
        return city;
    }

    @JsonProperty("nova_poshta")
    public String getNovaPoshta() {
        return novaPoshta;
    }

    @JsonProperty("total_sum")
    public Integer getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(Integer totalSum) {
        this.totalSum = totalSum;
    }

    @JsonProperty("payment_type")
    public PaymentType getPaymentType() {
        return paymentType;
    }

    @JsonProperty("date")
    @JsonSerialize(using = LocalDateSerializer.class)
    public LocalDate getDatePlaced() {
        return datePlaced;
    }

    @JsonProperty("timestamp")
    public Timestamp getTimestamp() {
        return Timestamp.valueOf(datePlaced.atStartOfDay());
    }

    @JsonProperty("status")
    public OrderStatus getStatus() {
        return status;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDatePlaced(LocalDate datePlaced) {
        this.datePlaced = datePlaced;
    }

    public void setNovaPoshta(String novaPoshta) {
        this.novaPoshta = novaPoshta;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<ProductToForOrderTo> getProducts() {
        return products;
    }

    public void setProducts(List<ProductToForOrderTo> products) {
        this.products = products;
    }

}
