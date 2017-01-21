package com.malikov.shopsystem.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

//import javax.persistence.*;

@NamedQueries({
        @NamedQuery(name = Order.DELETE, query = "DELETE FROM Order o WHERE o.id=:id"),
        @NamedQuery(name = Order.BY_CUSTOMER_ID, query = "SELECT o FROM Order o JOIN o.customer c WHERE c.id=:customerId"),
//Order.BY_PRODUCT_ID query may be wrong!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
        @NamedQuery(name = Order.BY_PRODUCT_ID, query = "SELECT o FROM Order o JOIN o.products p WHERE p.id=:productId"),
        @NamedQuery(name = Order.ALL, query = "SELECT o FROM Order o"),
})
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    public static final String DELETE = "Order.delete";
    public static final String ALL = "Order.getAllSorted";
    public static final String BY_CUSTOMER_ID = "Order.getByCustomerId";
    public static final String BY_PRODUCT_ID = "Order.getByProductId";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;


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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "products_to_orders"
            ,joinColumns = @JoinColumn(name = "order_id")
            ,inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @MapKeyJoinColumn(name = "product_id")
    @Column(name = "product_quantity")
    private Map<Product, Integer> productQuantityMap;

    public Order() {
    }

    public Order(Integer id, Customer customer, User user, PaymentType paymentType, OrderStatus orderStatus, LocalDate datePlaced, Map<Product, Integer> productQuantityMap) {
        this.id = id;
        this.customer = customer;
        this.user = user;
        this.paymentType = paymentType;
        this.status = orderStatus;
        this.datePlaced = datePlaced;
        this.productQuantityMap = new HashMap<>(productQuantityMap);
    }

    public Order(Customer customer, User user, PaymentType paymentType, OrderStatus orderStatus, Map<Product, Integer> productQuantityMap) {
        this(null, customer, user,  paymentType, orderStatus, null, productQuantityMap);
    }

    public Order(Order o) {
        this(o.getId(), o.getCustomer(), o.getUser(), o.getPaymentType(), o.getStatus(), o.getDatePlaced(), o.getProductQuantityMap());
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

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public Map<Product, Integer> getProductQuantityMap() {
        return productQuantityMap;
    }

    public void setProductQuantityMap(Map<Product, Integer> productQuantityMap) {
        this.productQuantityMap = productQuantityMap;
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
                Objects.equals(user, order.user) &&
                Objects.equals(productQuantityMap, order.productQuantityMap) &&
                paymentType == order.paymentType &&
                status == order.status &&
                Objects.equals(datePlaced, order.datePlaced);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), customer, user, productQuantityMap, paymentType, status, datePlaced);
    }

    @Override
    public String toString() {
        return "Order{" +
                "customer=" + customer +
                ", user=" + user +
                ", productQuantityMap=" + productQuantityMap +
                ", paymentType=" + paymentType +
                ", status=" + status +
                ", datePlaced=" + datePlaced +
                '}';
    }
}

