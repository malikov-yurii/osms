package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.DbOperation;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.model.*;
import com.malikov.shopsystem.repository.*;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import static com.malikov.shopsystem.DbOperation.DECREASE_IN_STOCK;
import static com.malikov.shopsystem.DbOperation.INCREASE_IN_STOCK;
import static com.malikov.shopsystem.util.OrderStatusUtil.isWithdrawalStatus;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger LOG = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariationRepository productVariationRepository;

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void update(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Order get(Long id) {
        return orderRepository.findOne(id);
    }

    @Override
    public void delete(Long id) {
        Order order = get(id);

        if (isWithdrawalStatus(order.getStatus())) {
            updateProductQuantityInDbForAllOrderItems(order, INCREASE_IN_STOCK);
        }

        orderRepository.delete(order);
    }

    @Override
    public Collection<Order> getByCustomerId(Long customerId) {
        return orderRepository.getByCustomerId(customerId);
    }

    @Override
    public Collection<Order> getByProductId(Long productId) {
        return orderRepository.getByProductId(productId);
    }

    @Override
    @Transactional
    public void updateStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findOne(orderId);
        OrderStatus oldStatus = order.getStatus();
        order.setStatus(newStatus);
        orderRepository.save(order);

        if (newStatus.equals(oldStatus) || (isWithdrawalStatus(newStatus) == isWithdrawalStatus(oldStatus))) {
            return;
        }

        if (!isWithdrawalStatus(oldStatus) && isWithdrawalStatus(newStatus)) {
            updateProductQuantityInDbForAllOrderItems(order, DECREASE_IN_STOCK);
        } else {
            updateProductQuantityInDbForAllOrderItems(order, INCREASE_IN_STOCK);
        }
    }

    private void updateProductQuantityInDbForAllOrderItems(Order order, DbOperation dbOperation) {
        for (OrderItem orderItem : order.getOrderItems()) {
            if (orderItem.getProduct() == null) {
                continue;
            }

            if (orderItem.getProductVariation() != null) {
                updateProductVariationQuantityInDb(orderItem, dbOperation);
            } else {
                updateProductQuantityInDb(orderItem, dbOperation);
            }
        }
    }

    private void updateProductQuantityInDb(OrderItem orderItem, DbOperation dbOperation) {
        Product product = orderItem.getProduct();
        int productQuantityToPersist = calculateProductQuantityToPersist(product.getQuantity(),
                orderItem.getProductQuantity(), dbOperation);
        product.setQuantity(productQuantityToPersist);
        productRepository.save(product);
    }

    private void updateProductVariationQuantityInDb(OrderItem orderItem, DbOperation dbOperation) {
        ProductVariation productVariation = orderItem.getProductVariation();
        int productQuantityToPersist = calculateProductQuantityToPersist(productVariation.getQuantity(),
                orderItem.getProductQuantity(), dbOperation);
        productVariation.setQuantity(productQuantityToPersist);
        productVariationRepository.save(productVariation);
    }

    private int calculateProductQuantityToPersist(int productQuantityInDb, int productQuantityInOrderItem,
                                                  DbOperation dbOperation) {
        int productQuantityToPersist;
        switch (dbOperation) {
            case INCREASE_IN_STOCK:
                productQuantityToPersist = productQuantityInDb + productQuantityInOrderItem;
                break;
            case DECREASE_IN_STOCK:
                productQuantityToPersist = productQuantityInDb - productQuantityInOrderItem;
                break;
            default:
                throw new RuntimeException("only INCREASE_IN_STOCK or DECREASE_IN_STOCK supported");
        }
        return productQuantityToPersist;
    }

    @Override
    @Transactional
    public void updateComment(Long orderId, String comment) {
        Order order = get(orderId);
        order.setComment(comment);
        save(order);
    }

    @Override
    @Transactional
    public void updatePaymentType(Long orderId, PaymentType paymentType) {
        Order order = get(orderId);
        order.setPaymentType(paymentType);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerFirstName(Long orderId, String firstName) {
        Order order = get(orderId);
        order.setCustomerName(firstName);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerLastName(Long orderId, String lastName) {
        Order order = get(orderId);
        order.setCustomerLastName(lastName);
        save(order);
    }

    @Override
    @Transactional
    public void updateCustomerPhoneNumber(Long orderId, String phoneNumber) {
        Order order = get(orderId);
        order.setCustomerPhoneNumber(phoneNumber);
        save(order);
    }

    @Override
    @Transactional
    public void updateCity(Long orderId, String cityName) {
        Order order = get(orderId);
        order.setCustomerCity(cityName);
        save(order);
    }

    @Override
    @Transactional
    public void updatePostOffice(Long orderId, String postOffice) {
        Order order = get(orderId);
        order.setCustomerPostOffice(postOffice);
        save(order);
    }

    @Override
    @Transactional
    public void updateTotalSum(Long orderId, BigDecimal totalSum) {
        Order order = get(orderId);
        order.setTotalSum(totalSum);
        save(order);
    }

    @Override
    @Transactional
    public void setCustomer(Long orderId, Long customerId) {
        Order order = get(orderId);
        Customer customer = customerRepository.findOne(customerId);
        order.setCustomer(customer);
        order.setCustomerName(customer.getName());
        order.setCustomerLastName(customer.getLastName());
        order.setCustomerPhoneNumber(customer.getPhoneNumber());
        order.setCustomerCity(customer.getCity());
        order.setCustomerPostOffice(customer.getPostOffice());
        save(order);
    }

    @Override
    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        Page<Order> page = orderRepository.findAll(new PageRequest(pageNumber, pageCapacity,
                new Sort(
                        //new Sort.Order(Sort.Direction.ASC, "statusSortOrder"),
                        new Sort.Order(Sort.Direction.DESC, "id")
                )));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(OrderUtil::asTo)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }

    /*@Override
    public Page<OrderDto> getPage(int pageNumber, int pageCapacity) {
        Page<Order> page = orderRepository.findAll(new PageRequest(pageNumber, pageCapacity));
        return new PageImpl<>(
                page.getContent().stream()
                        .map(OrderUtil::asTo)
                        .collect(Collectors.toList()),
                null,
                page.getTotalElements());
    }
*/
    @Override
    public Long getTotalQuantity() {
        return orderRepository.count();
    }

    @Override
    public Order create() {
        Order newOrder = new Order(null,
                userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                PaymentType.NP, OrderStatus.NEW, null, Collections.singletonList(new OrderItem()));
        LOG.info("create new {}", newOrder);
        return save(newOrder);
    }
}
