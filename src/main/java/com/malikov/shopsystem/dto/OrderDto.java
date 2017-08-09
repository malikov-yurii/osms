package com.malikov.shopsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.util.DateTimeUtil;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    private Long id;

    private Long customerId;

    private String customerLastName;

    private String customerFirstName;

    private String customerPhoneNumber;

    private String destinationCity;

    private String destinationPostOffice;

    private String customerNote;

    private PaymentType paymentType;

    private BigDecimal totalSum;

    @DateTimeFormat(pattern = DateTimeUtil.DATE_TIME_PATTERN)
    private LocalDateTime createdDateTime;

    private OrderStatus status;

    private String note;

    private List<OrderItemDto> orderItems;

    public OrderDto(
            Long id, Long customerId, String customerFirstName, String customerLastName, String customerPhoneNumber, String destinationCity,
            String destinationPostOffice, String customerNote, PaymentType paymentType, LocalDateTime createdDateTime, OrderStatus status,
            String note, BigDecimal totalSum, List<OrderItemDto> orderItems) {
        this.id = id;
        this.customerId = customerId == null ? 0 : customerId;
        this.customerFirstName = customerFirstName != null ? customerFirstName : "";
        this.customerLastName = customerLastName != null ? customerLastName : "";
        this.customerPhoneNumber = customerPhoneNumber != null ? customerPhoneNumber : "";
        this.destinationCity = destinationCity != null ? destinationCity : "";
        this.destinationPostOffice = destinationPostOffice != null ? destinationPostOffice : "";
        this.customerNote = customerNote != null ? customerNote : "";
        this.paymentType = paymentType;
        this.createdDateTime = createdDateTime;
        this.status = status;
        this.note = note;
        this.totalSum = totalSum.setScale(0, RoundingMode.HALF_UP);

        this.orderItems = orderItems;
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

    public String getCustomerFirstName() {
        return customerFirstName;
    }

    public void setCustomerFirstName(String customerFirstName) {
        this.customerFirstName = customerFirstName;
    }

    public String getCustomerLastName() {
        return customerLastName;
    }

    public void setCustomerLastName(String customerLastName) {
        this.customerLastName = customerLastName;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getDestinationPostOffice() {
        return destinationPostOffice;
    }

    public void setDestinationPostOffice(String destinationPostOffice) {
        this.destinationPostOffice = destinationPostOffice;
    }

    public String getCustomerNote() {
        return customerNote;
    }

    public void setCustomerNote(String customerNote) {
        this.customerNote = customerNote;
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
    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    //@JsonDeserialize(using = LocalDateDeserializer.class)
    public void setCreatedDateTime(LocalDateTime createdDateTime) {

        this.createdDateTime = createdDateTime;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

}
