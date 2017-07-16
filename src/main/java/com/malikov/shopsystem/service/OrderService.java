package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Collection;

public interface OrderService {

    Order create();

    Order save(Order order);

    void update(Order order);

    Order get(Long id);

    void delete(Long id);

    Collection<Order> getByCustomerId(Long customerId);

    Collection<Order> getByProductId(Long productId);

    Long getTotalQuantity();

    void updateStatus(Long orderId, OrderStatus status);

    void updateComment(Long orderId, String comment);

    void updatePaymentType(Long orderId, PaymentType paymentType);

    void updateCustomerFirstName(Long orderId, String firstName);

    void updateCustomerLastName(Long orderId, String lastName);

    void updateCustomerPhoneNumber(Long orderId, String phoneNumber);

    void updateCity(Long orderId, String cityName);

    void updatePostOffice(Long orderId, String postOffice);

    void updateTotalSum(Long orderId, BigDecimal totalSum);

    void setCustomer(Long orderId, Long customerId);

    Page<OrderDto> getPage(int pageNumber, int pageCapacity);
}
