package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.DbOperation;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
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
import org.springframework.transaction.annotation.Propagation;
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
    public Page<OrderDto> getFilteredPage(OrderFilterDto orderFilterDto, int pageNumber, int pageCapacity) {
        return null;
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
    public Order save(OrderDto orderDto) {
        throw new RuntimeException("save new order method not implemented");
    }

    @Override
    public void update(OrderDto orderDto) {
        Order order = get(orderDto.getId());
        if (order == null) {
            throw new RuntimeException(String.format("order with id=%d not found", orderDto.getId()));
        }

        setCustomerInfoToOrder(order, orderDto);
        setPaymentType(order, orderDto.getPaymentType());
        setNote(order, orderDto.getNote());
        setTotalSum(order, orderDto.getTotalSum());

        if (orderDto.getStatus() != null) {
            OrderStatus oldStatus = orderDto.getStatus();
            order.setStatus(orderDto.getStatus());
            orderRepository.save(order);
            updateOrderItemProductStock(order, orderDto.getStatus(), oldStatus);
        } else {
            orderRepository.save(order);
        }

    }

    private void setCustomerInfoToOrder(Order order, OrderDto orderDto) {
        if (orderDto.getCustomerId() != null) {
            setCustomer(order, orderDto.getCustomerId());
        } else {
            setCustomerFirstName(order, orderDto.getCustomerFirstName());
            setCustomerLastName(order, orderDto.getCustomerLastName());
            setCustomerPhoneNumber(order, orderDto.getCustomerPhoneNumber());
            setDestinationCity(order, orderDto.getDestinationCity());
            setDestinationPostOffice(order, orderDto.getDestinationPostOffice());
        }
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void setCustomer(Order order, Long customerId) {

        Customer customer = customerRepository.findOne(customerId);
        if (customer == null) {
            throw new RuntimeException(String.format("Customer with id=%d not found", customerId));
        }
        order.setCustomer(customer);
        order.setCustomerFirstName(customer.getName());
        order.setCustomerLastName(customer.getLastName());
        order.setCustomerPhoneNumber(customer.getPhoneNumber());
        order.setDestinationCity(customer.getCity());
        order.setDestinationPostOffice(customer.getPostOffice());
    }

    private void setCustomerFirstName(Order order, String firstName) {
        if (firstName != null) {
            order.setCustomerFirstName(firstName);
        }
    }

    private void setCustomerLastName(Order order, String lastName) {
        if (lastName != null) {
            order.setCustomerLastName(lastName);
        }
    }

    private void setCustomerPhoneNumber(Order order, String phoneNumber) {
        if (phoneNumber != null) {
            order.setCustomerPhoneNumber(phoneNumber);
        }
    }

    private void setDestinationCity(Order order, String destinationCity) {
        if (destinationCity != null) {
            order.setDestinationCity(destinationCity);
        }
    }

    private void setDestinationPostOffice(Order order, String destinationPostOffice) {
        if (destinationPostOffice != null) {
            order.setDestinationPostOffice(destinationPostOffice);
        }
    }

    private void setPaymentType(Order order, PaymentType paymentType) {
        if (paymentType != null) {
            order.setPaymentType(paymentType);
        }
    }

    private void setNote(Order order, String comment) {
        if (comment != null) {
            order.setComment(comment);
        }
    }

    private void setTotalSum(Order order, BigDecimal totalSum) {
        if (totalSum != null) {
            order.setTotalSum(totalSum);
        }
    }

    private void updateOrderItemProductStock(Order order, OrderStatus newStatus, OrderStatus oldStatus) {
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

    @Override
    public Long getTotalQuantity() {
        return orderRepository.count();
    }

    @Override
    public Order createEmpty() {
        Order newOrder = new Order(null,
                userRepository.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                PaymentType.NP, OrderStatus.NEW, null, Collections.singletonList(new OrderItem()));
        LOG.info("create new {}", newOrder);
        return orderRepository.save(newOrder);
    }
}
