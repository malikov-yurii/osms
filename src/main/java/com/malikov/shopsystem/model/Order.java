package com.malikov.shopsystem.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

//import javax.persistence.*;

@NamedQueries({
        @NamedQuery(name = Order.DELETE, query = "DELETE FROM Order o WHERE o.id=:id"),
        @NamedQuery(name = Order.BY_CUSTOMER_ID, query = "SELECT o FROM Order o JOIN o.customer c WHERE c.id=:customerId"),
//Order.BY_PRODUCT_ID query may be wrong!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
        // TODO: 1/22/2017 implement it using not as set, but as map
//        @NamedQuery(name = Order.BY_PRODUCT_ID, query = "SELECT o FROM Order o JOIN o.products p WHERE p.id=:productId"),
        @NamedQuery(name = Order.ALL, query = "SELECT o FROM Order o"),
})
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    public static final String DELETE = "Order.delete";
    public static final String ALL = "Order.getAllSorted";
    public static final String BY_CUSTOMER_ID = "Order.getByCustomerId";
//    public static final String BY_PRODUCT_ID = "Order.getByProductId";

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
    private String customerNovaPoshta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "date_placed")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate datePlaced;

//    Old solution:
//  Variation 1
//    @ElementCollection(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "products_to_orders"
//            ,joinColumns = @JoinColumn(name = "order_id")
//    )
//    @MapKeyJoinColumn(name = "product_id")
//    @Column(name = "product_quantity")
//  Variation 2
//    @ElementCollection(fetch = FetchType.EAGER)
//    @CollectionTable(name = "products_to_orders")
//    @MapKeyJoinColumn(name = "product_id")
//    @Column(name = "product_quantity")
//    private Map<Product, Integer> productQuantityMap;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> orderItems;

    public Order() {
    }

    public Order(Integer id, Customer customer, User user, PaymentType paymentType, OrderStatus orderStatus, LocalDate datePlaced, List<OrderItem> orderItems) {
        this.id = id;
        this.customer = customer;
        this.customerName = customer.getName();
        this.customerLastName = customer.getLastName();
        this.customerCity = customer.getCity();
        this.customerNovaPoshta = customer.getNovaPoshta();
        this.user = user;
        this.paymentType = paymentType;
        this.status = orderStatus;
        this.datePlaced = datePlaced;
        this.orderItems = orderItems;
    }

    public Order(Customer customer, User user, PaymentType paymentType, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this(null, customer, user, paymentType, orderStatus, null, orderItems);
    }

    public Order(Order o) {
        this(o.getId(), o.getCustomer(), o.getUser(), o.getPaymentType(), o.getStatus(), o.getDatePlaced(), o.getOrderItems());
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

    public String getCustomerNovaPoshta() {
        return customerNovaPoshta;
    }

    public void setCustomerNovaPoshta(String customerNovaPoshta) {
        this.customerNovaPoshta = customerNovaPoshta;
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
                Objects.equals(customerNovaPoshta, order.customerNovaPoshta) &&
                Objects.equals(user, order.user) &&
                paymentType == order.paymentType &&
                status == order.status &&
                Objects.equals(datePlaced, order.datePlaced) &&
                Objects.equals(orderItems, order.orderItems);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), customer, customerName, customerLastName, customerPhoneNumber, customerCity, customerNovaPoshta, user, paymentType, status, datePlaced, orderItems);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
//                ", customer=" + customer +
//                ", customerName='" + customerName + '\'' +
                ", customerLastName='" + customerLastName + '\'' +
//                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
//                ", customerCity='" + customerCity + '\'' +
//                ", customerNovaPoshta='" + customerNovaPoshta + '\'' +
//                ", user=" + user +
//                ", paymentType=" + paymentType +
//                ", status=" + status +
//                ", datePlaced=" + datePlaced +
                ", orderItems=" + orderItems +
                '}';
    }
}

