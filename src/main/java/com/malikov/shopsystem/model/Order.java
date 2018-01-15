package com.malikov.shopsystem.model;

import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.util.converter.LocalDateTimeAttributeConverter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", updatable = false, insertable = false)
    private Customer customer;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    private String customerFirstName;

    @Column(name = "customer_last_name")
    private String customerLastName;

    @Column(name = "customer_phone_number")
    private String customerPhoneNumber;

    @Column(name = "customer_city")
    private String destinationCity;

    @Column(name = "customer_nova_poshta")
    private String destinationPostOffice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "date_placed", columnDefinition = "timestamp default now()")
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    private LocalDateTime dateTimeCreated = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "order")
    @Fetch(FetchMode.SELECT)
    @OrderBy("id ASC")
    private List<OrderLine> orderItems;

    @Column(name = "total_sum")
    private BigDecimal totalValue = BigDecimal.ZERO;

    @Column(name = "comment")
    private String comment;

    @Column(name = "status_sort_order")
    private Integer statusSortOrder;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getDateTimeCreated() {
        return dateTimeCreated;
    }

    public void setDateTimeCreated(LocalDateTime dateTimeCreated) {
        this.dateTimeCreated = dateTimeCreated;
    }

    public List<OrderLine> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderLine> orderItems) {
        this.orderItems = orderItems;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStatusSortOrder() {
        return statusSortOrder;
    }

    public void setStatusSortOrder(Integer statusSortOrder) {
        this.statusSortOrder = statusSortOrder;
    }
}

