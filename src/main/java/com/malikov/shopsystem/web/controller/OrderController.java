package com.malikov.shopsystem.web.controller;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.service.CustomerService;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.service.OrderService;
import com.malikov.shopsystem.service.UserService;
import com.malikov.shopsystem.util.OrderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping(value = "/order")
public class OrderController {

    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping(value = "/{id}")
    public OrderDto get(@PathVariable("id") Long orderId) {
        return OrderUtil.asTo(orderService.get(orderId));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelMap getOrderTablePage(@RequestParam("pageNumber") int pageNumber,
                                      @RequestParam("pageCapacity") int pageCapacity) {
        ModelMap modelMap = new ModelMap();
        Page<OrderDto> page = orderService.getPage(pageNumber, pageCapacity);
        modelMap.addAttribute("totalElements", page.getTotalElements());
        modelMap.addAttribute("elements", page.getContent());
        return modelMap;
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        orderService.delete(id);
    }

    @PostMapping
    public Long create() {
        return orderService.create().getId();
    }

    @GetMapping(value = "/autocomplete-payment-type",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public PaymentType[] autocompletePaymentType() {
        return PaymentType.values();
    }

    @GetMapping(value = "/autocomplete-status",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public OrderStatus[] autocompleteOrderStatus() {
        return OrderStatus.values();
    }

    @PutMapping(value = "/{orderId}/status")
    public void updateOrderStatus(@PathVariable("orderId") Long orderId,
                                  @RequestParam("status") OrderStatus status) {
        orderService.updateStatus(orderId, status);
    }

    @PutMapping(value = "/{orderId}/comment")
    public void updateOrderComment(@PathVariable("orderId") Long orderId,
                                   @RequestParam("comment") String comment) {
        orderService.updateComment(orderId, comment);
    }

    @PutMapping(value = "/{orderId}/payment-type")
    public void updateOrderPaymentType(@PathVariable("orderId") Long orderId,
                                       @RequestParam("paymentType") PaymentType paymentType) {
        orderService.updatePaymentType(orderId, paymentType);
    }

    @PutMapping(value = "/{orderId}/first-name")
    public void updateFirstName(@PathVariable("orderId") Long orderId,
                                @RequestParam("firstName") String firstName) {
        orderService.updateCustomerFirstName(orderId, firstName);
    }

    @PutMapping(value = "/{orderId}/last-name")
    public void updateLastName(@PathVariable("orderId") Long orderId,
                               @RequestParam("lastName") String lastName) {
        orderService.updateCustomerLastName(orderId, lastName);
    }

    @PutMapping(value = "/{orderId}/phone-number")
    public void updatePhoneNumber(@PathVariable("orderId") Long orderId,
                                  @RequestParam("phoneNumber") String phoneNumber) {
        orderService.updateCustomerPhoneNumber(orderId, phoneNumber);
    }

    @PutMapping(value = "/{orderId}/city")
    public void updateCity(@PathVariable("orderId") Long orderId,
                           @RequestParam("city") String cityName) {
        orderService.updateCity(orderId, cityName);
    }

    @PutMapping(value = "/{orderId}/post-office")
    public void updatePostOffice(@PathVariable("orderId") Long orderId,
                                 @RequestParam("postOffice") String postOffice) {
        orderService.updatePostOffice(orderId, postOffice);
    }

    @PutMapping(value = "/{orderId}/total-sum")
    public void updateTotalSum(@PathVariable("orderId") Long orderId, @RequestParam("totalSum") BigDecimal totalSum) {
        orderService.updateTotalSum(orderId, totalSum);
    }

    @PutMapping(value = "/{orderId}/set-customer")
    public void setCustomerForOrder(@PathVariable("orderId") Long orderId,
                                    @RequestParam("customerId") Long customerId) {
        orderService.setCustomer(orderId, customerId);
    }
}
