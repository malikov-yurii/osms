package com.malikov.shopsystem.model;

import com.malikov.shopsystem.util.OrderUtil;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_orders")
public class Order extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_last_name")
    private String customerLastName;

    @Column(name = "customer_phone_number")
    private String customerPhoneNumber;

    @Column(name = "customer_city")
    private String customerCity;

    @Column(name = "customer_nova_poshta")
    private String customerPostOffice;

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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate datePlaced = LocalDate.now();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "order")
    @Fetch(FetchMode.SELECT)
    @OrderBy("id ASC")
    private List<OrderItem> orderItems;

    @Column(name = "total_sum")
    private BigDecimal totalSum;

    @Column(name = "comment")
    private String comment;

    @Column(name = "status_sort_order")
    private Integer statusSortOrder;


    public Order() {}

    public Order(Customer customer, User user, PaymentType paymentType,
                 OrderStatus status, String comment, List<OrderItem> items) {
        this(null, customer, user, paymentType, status, comment, null, items);
    }

    public Order(Long id, Customer customer, User user, PaymentType paymentType,
                 OrderStatus status, String comment, LocalDate datePlaced,
                 List<OrderItem> orderItems) {
        super(id);
        if (customer != null) {
            this.customer = customer;
            this.customerName = customer.getName();
            this.customerLastName = customer.getLastName();
            this.customerPhoneNumber = customer.getPhoneNumber();
            this.customerCity = customer.getCity();
            this.customerPostOffice = customer.getPostOffice();
        }

        this.user = user;
        this.paymentType = paymentType;
        this.status = status;
        this.comment = comment;
        this.datePlaced = datePlaced;

        if (orderItems != null) {
            this.orderItems = orderItems;
            this.orderItems.forEach(orderItem -> orderItem.setOrder(this));
            this.totalSum = OrderUtil.calculateTotalSum(orderItems);
        } else {
            this.totalSum = BigDecimal.ZERO;
        }

        this.statusSortOrder = OrderUtil.getStatusSortOrder(status);
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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

    public String getCustomerCity() {
        return customerCity;
    }

    public void setCustomerCity(String customerCity) {
        this.customerCity = customerCity;
    }

    public String getCustomerPostOffice() {
        return customerPostOffice;
    }

    public void setCustomerPostOffice(String customerPostOffice) {
        this.customerPostOffice = customerPostOffice;
    }

    public LocalDate getDatePlaced() {
        return datePlaced;
    }

    public void setDatePlaced(LocalDate datePlaced) {
        this.datePlaced = datePlaced;
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
        this.statusSortOrder = OrderUtil.getStatusSortOrder(status);
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(BigDecimal totalSum) {
        this.totalSum = totalSum;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order)) return false;
        if (!super.equals(o)) return false;
        Order order = (Order) o;
        return Objects.equals(customer, order.customer) &&
                Objects.equals(customerName, order.customerName) &&
                Objects.equals(customerLastName, order.customerLastName) &&
                Objects.equals(customerPhoneNumber, order.customerPhoneNumber) &&
                Objects.equals(customerCity, order.customerCity) &&
                Objects.equals(customerPostOffice, order.customerPostOffice) &&
                Objects.equals(user, order.user) &&
                paymentType == order.paymentType &&
                status == order.status &&
                Objects.equals(datePlaced, order.datePlaced) &&
                Objects.equals(orderItems, order.orderItems) &&
                Objects.equals(comment, order.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), customer, customerName, customerLastName, customerPhoneNumber,
                customerCity, customerPostOffice, user, paymentType, status, datePlaced, orderItems);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customer=" + customer +
                ", customerName='" + customerName + '\'' +
                ", customerLastName='" + customerLastName + '\'' +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", customerCity='" + customerCity + '\'' +
                ", customerPostOffice='" + customerPostOffice + '\'' +
                ", user=" + user +
                ", status=" + status +
                ", paymentType=" + paymentType +
                ", datePlaced=" + datePlaced +
                ", orderItems=" + orderItems +
                ", totalSum=" + totalSum +
                ", comment=" + totalSum +
                '}';
    }
}

