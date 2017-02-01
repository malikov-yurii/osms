package com.malikov.shopsystem.to;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.util.OrderUtil;
import com.malikov.shopsystem.util.serializers.LocalDateDeserializer;
import com.malikov.shopsystem.util.serializers.LocalDateSerializer;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrderTo {

    private Integer id;

    private String firstName;

    private String lastName;

    private String phone;

    private String city;

    private String novaPoshta;

    private Integer totalSum;

    private PaymentType paymentType;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate date;

    private Timestamp timestamp;

    private OrderStatus status;

    private List<OrderItemTo> orderItemTos;

    public OrderTo(
            Integer id
            ,String firstName
            ,String lastName
            ,String phone
            ,String city
            ,String novaPoshta
            ,PaymentType paymentType
            ,LocalDate date
            ,OrderStatus status
            ,List<OrderItemTo> orderItemTos
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.city = city;
        this.novaPoshta = novaPoshta;
        this.paymentType = paymentType;
        this.date = date;
        this.status = status;
        this.totalSum = OrderUtil.calculateTotalSumOfTos(orderItemTos);
        this.orderItemTos = orderItemTos;
    }

    public OrderTo(
            Integer id
            ,String firstName
            ,String lastName
            ,String phone
            ,String city
            ,String novaPoshta
            ,PaymentType paymentType
            ,LocalDate date
            ,OrderStatus status
    ) {
        this(id, firstName, lastName, phone, city, novaPoshta, paymentType, date, status, new ArrayList<>());
        this.totalSum = 0;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public Integer getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(Integer totalSum) {
        this.totalSum = totalSum;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    @JsonSerialize(using = LocalDateSerializer.class)
    public LocalDate getDate() {
        return date;
    }

    public Timestamp getTimestamp() {
        return Timestamp.valueOf(date.atStartOfDay());
    }

    public OrderStatus getStatus() {
        return status;
    }

    @JsonDeserialize(using = LocalDateDeserializer.class)
    public void setDate(LocalDate date) {

        this.date = date;
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

    public List<OrderItemTo> getOrderItemTos() {
        return orderItemTos;
    }

    public void setOrderItemTos(List<OrderItemTo> orderItemTos) {
        this.orderItemTos = orderItemTos;
    }

}
