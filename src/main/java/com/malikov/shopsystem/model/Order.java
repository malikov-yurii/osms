package com.malikov.shopsystem.model;

import com.malikov.shopsystem.util.OrderUtil;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

//import javax.persistence.*;

@NamedQueries({
        @NamedQuery(name = Order.DELETE, query = "DELETE FROM Order o WHERE o.id=:id"),
        @NamedQuery(name = Order.BY_CUSTOMER_ID, query = "SELECT o FROM Order o JOIN o.customer c WHERE c.id=:customerId"),
        @NamedQuery(name = Order.BY_PRODUCT_ID, query = "SELECT o FROM Order o JOIN o.orderItems oi WHERE oi.productId=:productId"),
        @NamedQuery(name = Order.ALL, query = "SELECT o FROM Order o"),
        @NamedQuery(name = Order.UPDATE_STATUS, query = "UPDATE Order o SET o.status = :status WHERE o.id = :orderId"),
})
@Entity
@Table(name = "osms_orders")
public class Order extends BaseEntity {

    public static final String DELETE = "Order.delete";
    public static final String ALL = "Order.getAllSorted";
    public static final String BY_CUSTOMER_ID = "Order.getByCustomerId";
    public static final String BY_PRODUCT_ID = "Order.getByProductId";
    public static final String UPDATE_STATUS = "Order.updateStatus";

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

//    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_placed"
            , columnDefinition = "timestamp default now()"
//            , insertable=false
    )
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate datePlaced = LocalDate.now();

    //    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "order_id")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "order")
    @Fetch(FetchMode.SELECT)
    @OrderBy("id ASC")
    private List<OrderItem> orderItems;

    @Column(name = "total_sum")
    private Integer totalSum;

    public Order() {
    }

    public Order(Integer id, Customer customer, User user, PaymentType paymentType, OrderStatus orderStatus, LocalDate datePlaced, List<OrderItem> orderItems) {
        this.id = id;
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
        this.status = orderStatus;
        if (datePlaced != null) {
            this.datePlaced = datePlaced;
        }
        if (orderItems != null) {
            this.orderItems = orderItems;
            this.orderItems.forEach(orderItem -> orderItem.setOrder(this));
            this.totalSum = OrderUtil.calculateTotalSum(orderItems);
        } else {
            this.totalSum = 0;
        }
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

    public Integer getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(Integer totalSum) {
        this.totalSum = totalSum;
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
                Objects.equals(orderItems, order.orderItems);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), customer, customerName, customerLastName, customerPhoneNumber, customerCity, customerPostOffice, user, paymentType, status, datePlaced, orderItems);
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
                ", paymentType=" + paymentType +
                ", status=" + status +
                ", datePlaced=" + datePlaced +
                ", orderItems=" + orderItems +
                ", totalSum=" + totalSum +
                '}';
    }
}

