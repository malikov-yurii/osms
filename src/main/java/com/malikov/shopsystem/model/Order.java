package com.malikov.shopsystem.model;

import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.util.OrderUtil;
import com.malikov.shopsystem.util.converter.LocalDateTimeAttributeConverter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_orders")
public class Order extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", updatable = false, insertable = false)
    private Customer customer;


    @Column(name = "customer_id")
    private Long customerId;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

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
    //@DateTimeFormat(pattern = "yyyy-MM-dd")
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    private LocalDateTime dateTimeCreated = LocalDateTime.now();

    //@OneToMany(fetch = FetchType.EAGER, mappedBy = "order")
    //@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER, mappedBy = "order")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "order")
    @Fetch(FetchMode.SELECT)
    @OrderBy("id ASC")
    private List<OrderLine> orderItems;

    @Column(name = "total_sum")
    private BigDecimal totalValue;

    @Column(name = "comment")
    private String comment;

    @Column(name = "status_sort_order")
    private Integer statusSortOrder;


    public Order() {}

    public Order(Customer customer, User user, PaymentType paymentType,
                 OrderStatus status, String comment, List<OrderLine> items) {
        this(null, customer, user, paymentType, status, comment, null, items);
    }

    public Order(Long id, Customer customer, User user, PaymentType paymentType,
                 OrderStatus status, String comment, LocalDateTime dateTimeCreated,
                 List<OrderLine> orderItems) {
        super(id);
        if (customer != null) {
            this.customer = customer;
            this.customerFirstName = customer.getName();
            this.customerLastName = customer.getLastName();
            this.customerPhoneNumber = customer.getPhoneNumber();
            this.destinationCity = customer.getCity();
            this.destinationPostOffice = customer.getPostOffice();
        }

        this.user = user;
        this.paymentType = paymentType;
        this.status = status;
        this.comment = comment;
        this.dateTimeCreated = dateTimeCreated;

        if (orderItems != null) {
            this.orderItems = orderItems;
            this.orderItems.forEach(orderItem -> orderItem.setOrder(this));
            this.totalValue = OrderUtil.calculateTotalSum(orderItems);
        } else {
            this.totalValue = BigDecimal.ZERO;
        }

        this.statusSortOrder = OrderUtil.getStatusSortOrder(status);
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

    public LocalDateTime getDateTimeCreated() {
        return dateTimeCreated;
    }

    public void setDateTimeCreated(LocalDateTime dateTimeCreated) {
        this.dateTimeCreated = dateTimeCreated;
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

    public List<OrderLine> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderLine> orderItems) {
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

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalSum) {
        this.totalValue = totalSum;
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
                Objects.equals(customerFirstName, order.customerFirstName) &&
                Objects.equals(customerLastName, order.customerLastName) &&
                Objects.equals(customerPhoneNumber, order.customerPhoneNumber) &&
                Objects.equals(destinationCity, order.destinationCity) &&
                Objects.equals(destinationPostOffice, order.destinationPostOffice) &&
                Objects.equals(user, order.user) &&
                paymentType == order.paymentType &&
                status == order.status &&
                Objects.equals(dateTimeCreated, order.dateTimeCreated) &&
                Objects.equals(orderItems, order.orderItems) &&
                Objects.equals(comment, order.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), customer, customerFirstName, customerLastName, customerPhoneNumber,
                destinationCity, destinationPostOffice, user, paymentType, status, dateTimeCreated, orderItems);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customer=" + customer +
                ", customerName='" + customerFirstName + '\'' +
                ", customerLastName='" + customerLastName + '\'' +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", customerCity='" + destinationCity + '\'' +
                ", customerPostOffice='" + destinationPostOffice + '\'' +
                ", user=" + user +
                ", status=" + status +
                ", paymentType=" + paymentType +
                ", dateTimePlaced=" + dateTimeCreated +
                ", orderItems=" + orderItems +
                ", totalValue=" + totalValue +
                ", comment=" + totalValue +
                '}';
    }
}

