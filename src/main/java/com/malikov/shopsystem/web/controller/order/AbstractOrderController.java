package com.malikov.shopsystem.web.controller.order;

import com.malikov.shopsystem.model.*;
import com.malikov.shopsystem.service.*;
import com.malikov.shopsystem.to.CustomerAutocompleteTo;
import com.malikov.shopsystem.to.OrderDatatablePageTo;
import com.malikov.shopsystem.to.OrderItemAutocompleteTo;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractOrderController {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractOrderController.class);

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductVariationService productVariationService;

    public OrderTo getOrderTo(Long id) {
        LOG.info("get order {}", id);
        return OrderUtil.asTo(orderService.get(id));
    }

    public Order getOrder(Long id) {
        LOG.info("get order {}", id);
        return orderService.get(id);
    }

    public void delete(Long id) {
        LOG.info("delete order {}", id);
        orderService.delete(id);
    }

    public List<OrderTo> getAll() {
        LOG.info("getAll orders");
        return orderService.getAll().stream().map(OrderUtil::asTo).collect(Collectors.toList());
    }

    public OrderDatatablePageTo getDatatablePage(int start, int length) {
        LOG.info("getAll orders");
        Long orderTotalQuantity = orderService.getTotalQuantity();
        return new OrderDatatablePageTo(
                orderTotalQuantity,
                orderTotalQuantity,
                orderService.getDatatablePage(start, length).stream().map(OrderUtil::asTo).collect(Collectors.toList()));
    }

    public void update(Order order, Long id) {
        order.setId(id);
        LOG.info("update order{}", order);
        orderService.update(order);
    }



    public void updateOrderItemProductName(Long itemId, String name) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductName(name);
        orderItemService.update(orderItem);
    }

    public int updateOrderItemPrice(Long itemId, int price) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductPrice(price);
        Order order = orderItem.getOrder();
        int totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderService.update(order);
        orderItemService.update(orderItem);
        return totalSum;
    }

    public int updateOrderItemProductQuantity(Long itemId, int quantity) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductQuantity(quantity);
        Order order = orderItem.getOrder();
        int totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderService.update(order);
        orderItemService.update(orderItem);
        return totalSum;
    }

    public int updateOrderItemPriceProductIdProductVariationId(Long itemId, int price, Long productId, Long productVariationId, String orderItemName) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductPrice(price);
        orderItem.setProduct(productService.get(productId));
        orderItem.setProductName(orderItemName);
        if (productVariationId != 0)
            orderItem.setProductVariation(productVariationService.get(productVariationId));
        Order order = orderItem.getOrder();
        int totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderService.update(order);
        orderItemService.update(orderItem);
        return totalSum;
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByFirstNameMask(String firstNameMask) {
        return customerService
                .getByFirstNameMask(firstNameMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
                                customer.getId(),
                                customer.getName(),
                                customer.getLastName(),
                                customer.getPhoneNumber(),
                                customer.getCity(),
                                customer.getPostOffice()
                        ))
                .collect(Collectors.toList());
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByLastNameMask(String lastNameMask) {
        return customerService
                .getByLastNameMask(lastNameMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
                                customer.getId(),
                                customer.getName(),
                                customer.getLastName(),
                                customer.getPhoneNumber(),
                                customer.getCity(),
                                customer.getPostOffice()))
                .collect(Collectors.toList());
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByPhoneNumberMask(String phoneNumberMask) {
        return customerService
                .getByPhoneNumberMask(phoneNumberMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
                                customer.getId(),
                                customer.getName(),
                                customer.getLastName(),
                                customer.getPhoneNumber(),
                                customer.getCity(),
                                customer.getPostOffice()))
                .collect(Collectors.toList());
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByCityMask(String cityMask) {
        return customerService
                .getByCityMask(cityMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
                                customer.getId(),
                                customer.getName(),
                                customer.getLastName(),
                                customer.getPhoneNumber(),
                                customer.getCity(),
                                customer.getPostOffice()))
                .collect(Collectors.toList());
    }

    public PaymentType[] getPaymentTypeAutocomplete() {
        return PaymentType.values();
    }

    public OrderStatus[] getOrderStatusAutocomplete() {
        return OrderStatus.values();
    }

    public List<OrderItemAutocompleteTo> getOrderItemAutocompleteTosByProductMask(String productNameMask) {
        List<OrderItemAutocompleteTo> orderItemAutocompleteTos = new ArrayList<>();
        productService.getByProductNameMask(productNameMask).forEach(product -> {
            if (product.getHasVariations()) {
                for (ProductVariation productVariation : product.getVariations()) {
                    orderItemAutocompleteTos.add(
                            new OrderItemAutocompleteTo(
                                    product.getName() + " " + productVariation.getVariationValue().getName() + " " +
                                            productVariation.getPrice(),
                                    product.getId(),
                                    productVariation.getId(),
                                    product.getName() + " " + productVariation.getVariationValue().getName(),
                                    productVariation.getPrice()
                            )
                    );
                }
            } else {
                orderItemAutocompleteTos.add(
                        new OrderItemAutocompleteTo(
                                product.getName() + " " + product.getPrice(),
                                product.getId(),
                                0L,
                                product.getName(),
                                product.getPrice()
                        )
                );
            }
        });
        return orderItemAutocompleteTos;
    }

    public void addOrderItem(Long orderId) {
        orderItemService.save(new OrderItem(orderService.get(orderId), null, "", 0, 1));
    }

    public void deleteOrderItem(Long orderItemId) {
        orderItemService.delete(orderItemId);
    }

    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderService.get(orderId);
        order.setStatus(status);
        orderService.save(order);
    }

    public void updateOrderComment(Long orderId, String comment) {
        Order order = orderService.get(orderId);
        order.setComment(comment);
        orderService.save(order);
    }

    public void updateOrderPaymentType(Long orderId, PaymentType paymentType) {
        Order order = orderService.get(orderId);
        order.setPaymentType(paymentType);
        orderService.save(order);
    }

    public void updateFirstName(Long orderId, String firstName) {
        Order order = orderService.get(orderId);
        order.setCustomerName(firstName);
        orderService.save(order);
    }

    public void updateLastName(Long orderId, String lastName) {
        Order order = orderService.get(orderId);
        order.setCustomerLastName(lastName);
        orderService.save(order);
    }

    public void updatePhoneNumber(Long orderId, String phoneNumber) {
        Order order = orderService.get(orderId);
        order.setCustomerPhoneNumber(phoneNumber);
        orderService.save(order);
    }

    public void updateCity(Long orderId, String city) {
        Order order = orderService.get(orderId);
        order.setCustomerCity(city);
        orderService.save(order);
    }

    public void updatePostOffice(Long orderId, String postOffice) {
        Order order = orderService.get(orderId);
        order.setCustomerPostOffice(postOffice);
        orderService.save(order);
    }

    public void updateTotalSum(Long orderId, Integer totalSum) {
        Order order = orderService.get(orderId);
        order.setTotalSum(totalSum);
        orderService.save(order);
    }

    public void setCustomerForOrder(Long orderId, Long customerId) {
        Order order = orderService.get(orderId);
        Customer customer = customerService.get(customerId);
        order.setCustomer(customer);
        order.setCustomerName(customer.getName());
        order.setCustomerLastName(customer.getLastName());
        order.setCustomerPhoneNumber(customer.getPhoneNumber());
        order.setCustomerCity(customer.getCity());
        order.setCustomerPostOffice(customer.getPostOffice());
        orderService.save(order);
    }

    public void persistCustomerFromOrder(Long orderId) {
        Order order = orderService.get(orderId);
        if (order.getCustomer() != null) {
            throw new DataIntegrityViolationException(messageSource.getMessage("exception.duplicateCustomer", null, LocaleContextHolder.getLocale()));
        }
        order.setCustomer(customerService.save(
                new Customer(order.getCustomerName()
                        , order.getCustomerLastName()
                        , order.getCustomerPhoneNumber()
                        , order.getCustomerCity()
                        , order.getCustomerPostOffice()
                        , null
                        , null)));
        orderService.save(order);
    }

}