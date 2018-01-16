package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.HasId;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.util.DateTimeUtil;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

public class OrderDto  implements Serializable, HasId {

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
    private OrderStatus status;
    private String note;

    private OrderLineDto[] orderItems;

    @DateTimeFormat(pattern = DateTimeUtil.DATE_TIME_PATTERN)
    private LocalDateTime createdDateTime;

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

    public OrderLineDto[] getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(OrderLineDto[] orderItems) {
        this.orderItems = orderItems;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

}
