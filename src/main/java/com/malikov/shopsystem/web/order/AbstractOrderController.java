package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.*;
import com.malikov.shopsystem.service.CustomerService;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.service.ProductService;
import com.malikov.shopsystem.to.CustomerAutocompleteTo;
import com.malikov.shopsystem.to.OrderItemAutocompleteTo;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractOrderController {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractOrderController.class);

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    public OrderTo getOrderTo(int id) {
        LOG.info("get order {}", id);
        return OrderUtil.asTo(orderService.get(id));
    }

    public Order getOrder(int id) {
        LOG.info("get order {}", id);
        return orderService.get(id);
    }

    public void delete(int id) {
        LOG.info("delete order {}", id);
        orderService.delete(id);
    }

    public List<OrderTo> getAll() {
        LOG.info("getAll orders");
        return orderService.getAll().stream().map(OrderUtil::asTo).collect(Collectors.toList());
    }

    public void update(Order order, int id) {
        order.setId(id);
        LOG.info("update order{}", order);
        orderService.update(order);
    }

    public Order create(Order order) {
        order.setId(null);
        LOG.info("create order{}", order);
        return orderService.save(order);
    }

    public void changeOrderItemProductName(int itemId, String name) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductName(name);
        orderItemService.update(orderItem);
    }

    public void changeOrderItemProductPrice(int itemId, int price) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductPrice(price);
        Order order = orderItem.getOrder();
        order.setTotalSum(OrderUtil.calculateTotalSum(order.getOrderItems()));
        orderService.update(order);
        orderItemService.update(orderItem);
    }

    public void changeOrderItemProductQuantity(int itemId, int quantity) {
        OrderItem orderItem = orderItemService.get(itemId);
        orderItem.setProductQuantity(quantity);
        Order order = orderItem.getOrder();
        order.setTotalSum(OrderUtil.calculateTotalSum(order.getOrderItems()));
        orderService.update(order);
        orderItemService.update(orderItem);
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByFirstNameMask(String firstNameMask) {
        return customerService
                .getByFirstNameMask(firstNameMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
                                customer.getName(),
                                customer.getLastName(),
                                customer.getPhoneNumber(),
                                customer.getCity(),
                                customer.getPostOffice()))
                .collect(Collectors.toList());
    }

    public List<CustomerAutocompleteTo> getCustomerAutocompleteTosByLastNameMask(String lastNameMask) {
        return customerService
                .getByLastNameMask(lastNameMask).stream().map(customer ->
                        new CustomerAutocompleteTo(
                                customer.getName() + " " + customer.getLastName() + " " + customer.getCity() + " " + customer.getPhoneNumber(),
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
                                    product.getName() + " " + productVariation.getVariationValue().getName(),
                                    productVariation.getPrice()
                            )
                    );
                }
            } else {
                orderItemAutocompleteTos.add(
                        new OrderItemAutocompleteTo(
                                product.getName() + " " + product.getPrice(),
                                product.getName(),
                                product.getPrice()
                        )
                );
            }
        });
        return orderItemAutocompleteTos;
    }

    public void addOrderItem(int orderId) {
        orderItemService.save(new OrderItem(orderService.get(orderId), null, "", 0, 0));
    }
}