package com.malikov.shopsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.util.DateTimeUtil;
import com.malikov.shopsystem.util.serializers.LocalDateDeserializer;
import com.malikov.shopsystem.util.serializers.LocalDateSerializer;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    private Long id;

    private Long customerId;

    private String lastName;

    private String firstName;

    private String phoneNumber;

    private String city;

    private String postOffice;

    private PaymentType paymentType;

    private BigDecimal totalSum;

    //@JsonDeserialize(using = LocalDateDeserializer.class)
    //@JsonSerialize(using = LocalDateSerializer.class)
    @DateTimeFormat(pattern = DateTimeUtil.DATE_TIME_PATTERN)
    private LocalDateTime date;

    private OrderStatus status;

    private String comment;

    private List<OrderItemDto> orderItemDtos;

    public OrderDto(
            Long id, Long customerId, String firstName, String lastName, String phoneNumber, String city,
            String postOffice, PaymentType paymentType, LocalDateTime date, OrderStatus status, String comment,
            BigDecimal totalSum, List<OrderItemDto> orderItemDtos) {
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
        this.totalSum = totalSum.setScale(0, RoundingMode.HALF_UP);

        this.orderItemDtos = orderItemDtos;
    }

    public OrderDto() {
    }

    @JsonIgnore
    public boolean isNew() {
        return id == null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public BigDecimal getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(BigDecimal totalSum) {
        this.totalSum = totalSum.setScale(0, RoundingMode.HALF_UP);
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    //@JsonSerialize(using = LocalDateSerializer.class)
    public LocalDateTime getDate() {
        return date;
    }

    //@JsonDeserialize(using = LocalDateDeserializer.class)
    public void setDate(LocalDateTime date) {

        this.date = date;
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

    public List<OrderItemDto> getOrderItemDtos() {
        return orderItemDtos;
    }

    public void setOrderItemDtos(List<OrderItemDto> orderItemDtos) {
        this.orderItemDtos = orderItemDtos;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

}
