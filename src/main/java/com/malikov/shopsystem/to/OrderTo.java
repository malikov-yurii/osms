package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.util.serializers.LocalDateDeserializer;
import com.malikov.shopsystem.util.serializers.LocalDateSerializer;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrderTo {

    private Integer id;

    private Integer customerId;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String city;

    private String postOffice;

    private Integer totalSum;

    private PaymentType paymentType;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate date;

    private Timestamp timestamp;

    private OrderStatus status;

    private String comment;

    private List<OrderItemTo> orderItemTos;

    public OrderTo(
            Integer id
            , Integer customerId
            , String firstName
            , String lastName
            , String phoneNumber
            , String city
            , String postOffice
            , PaymentType paymentType
            , LocalDate date
            , OrderStatus status
            , String comment
            , Integer totalSum
            , List<OrderItemTo> orderItemTos
    ) {
        this.id = id;
        this.customerId = customerId == null ? 0 : customerId;
        this.firstName = firstName != null ? firstName : "";
        this.lastName = lastName != null ? lastName : "";
        this.phoneNumber = phoneNumber != null ? phoneNumber : "";
        this.city = city != null ? city : "";
        this.postOffice = postOffice != null ? postOffice : "";
        this.paymentType = paymentType;
        this.date = date;
        this.status = status;
        this.comment = comment;
        this.totalSum = totalSum;

        this.orderItemTos = orderItemTos;
    }

    public OrderTo(
            Integer id
            , Integer customerId
            , String firstName
            , String lastName
            , String phoneNumber
            , String city
            , String postOffice
            , PaymentType paymentType
            , LocalDate date
            , OrderStatus status
            , String comment
            , Integer totalSum
    ) {
        this(id, customerId, firstName, lastName, phoneNumber, city, postOffice, paymentType, date, status, comment, totalSum, new ArrayList<>());
    }

    public OrderTo() {
    }

    @JsonIgnore
    public boolean isNew() {
        return id == null;
    }

    public void addProduct(OrderItemTo orderItemTo) {
        orderItemTos.add(orderItemTo);
        this.totalSum += orderItemTo.getPrice();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(Integer totalSum) {
        this.totalSum = totalSum;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    @JsonSerialize(using = LocalDateSerializer.class)
    public LocalDate getDate() {
        return date;
    }

    @JsonDeserialize(using = LocalDateDeserializer.class)
    public void setDate(LocalDate date) {

        this.date = date;
    }

    public Timestamp getTimestamp() {
        return Timestamp.valueOf(date.atStartOfDay());
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<OrderItemTo> getOrderItemTos() {
        return orderItemTos;
    }

    public void setOrderItemTos(List<OrderItemTo> orderItemTos) {
        this.orderItemTos = orderItemTos;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

}
