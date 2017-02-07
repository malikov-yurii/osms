package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.model.PaymentType;
import com.malikov.shopsystem.service.CustomerService;
import com.malikov.shopsystem.service.UserService;
import com.malikov.shopsystem.to.CustomerAutocompleteTo;
import com.malikov.shopsystem.to.OrderItemAutocompleteTo;
import com.malikov.shopsystem.to.OrderTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/ajax/profile/orders")
public class OrderAjaxController extends AbstractOrderController {

    @Autowired
    CustomerService customerService;

    @Autowired
    UserService userService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderTo> getAll() {
        return super.getAll();
    }

    @GetMapping(value = "/{id}")
    public OrderTo get(@PathVariable("id") int id) {
        return super.getOrderTo(id);
    }


    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") int id) {
        super.delete(id);
    }

    @PostMapping
    public ResponseEntity<String> create(@Valid OrderTo orderTo, BindingResult result, HttpEntity<String> httpEntity) {
        String json = httpEntity.getBody();
        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        Order newOrder = new Order(customerService.getByPhoneNumber(orderTo.getPhoneNumber()),
                userService.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()),
                orderTo.getPaymentType(),
                orderTo.getStatus(),
                null);

        super.create(newOrder);

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<String> updateOrCreate(@Valid OrderTo orderTo, BindingResult result, HttpEntity<String> httpEntity) {
//        String json = httpEntity.getBody();
//        if (result.hasErrors()) {
//            StringBuilder sb = new StringBuilder();
//            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
//            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
//        }
//        if (orderTo.isNew()) {
//            super.create(OrderUtil.createNewFromTo(orderTo));
//        } else {
//            Order order = super.getOrder(orderTo.getId());
//            super.update(OrderUtil.updateFromTo(order, orderTo), orderTo.getId());
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    // TODO: 2/5/2017 chang it to PUT
    @PostMapping(value = "{itemId}/update-name")
    public void updateOrderItemName(@PathVariable("itemId") int itemId, @RequestParam("name") String name) {
        super.updateOrderItemProductName(itemId, name);
    }

    // TODO: 2/5/2017 chang it to PUT
    @PostMapping(value = "{itemId}/update-price")
    public void updateOrderItemPrice(@PathVariable("itemId") int itemId, @RequestParam("price") int price) {
        super.updateOrderItemPrice(itemId, price);
    }

//    @PutMapping(value = "{itemId}/change-order-item-after-order-item-name-autocomplete", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public void changeOrderItemAfterOrderItemNameAutocomplete(@PathVariable("itemId") int itemId
//            , @RequestBody String json
//    ) {
//        JSONObject jsonObject = JSONObject.fromObject(json);
//        String m = jsonObject.get("message").toString();
//        String t = jsonObject.get("time").toString();
//        String n = jsonObject.get("name").toString();
//        super.updateOrderItemPriceProductIdProductVariationId(itemId, price, productId, productVariationId);
//    }

    // TODO: 2/5/2017 chang it to PUT
    @PostMapping(value = "{itemId}/update-order-item-after-order-item-name-autocomplete")
    public void updateOrderItemAfterOrderItemNameAutocomplete(@PathVariable("itemId") int itemId
            , @RequestParam("price") int price
    , @RequestParam("productId") int productId
    , @RequestParam("productVariationId") int productVariationId
    ) {
        super.updateOrderItemPriceProductIdProductVariationId(itemId, price, productId, productVariationId);
    }

    @PostMapping(value = "{itemId}/update-quantity")
    public void updateOrderItemQuantity(@PathVariable("itemId") int itemId, @RequestParam("quantity") int quantity) {
        super.updateOrderItemProductQuantity(itemId, quantity);
    }

    @PostMapping(value = "/autocomplete-first-name", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteTo> autocompleteFirstName(@RequestParam("term") String firstNameMask) {
        return super.getCustomerAutocompleteTosByFirstNameMask(firstNameMask);
    }

    @PostMapping(value = "/autocomplete-last-name", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteTo> autocompleteLastName(@RequestParam("term") String lastNameMask) {
        return super.getCustomerAutocompleteTosByLastNameMask(lastNameMask);
    }

    @PostMapping(value = "/autocomplete-phone-number", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteTo> autocompletePhoneNumber(@RequestParam("term") String phoneNumberMask) {
        return super.getCustomerAutocompleteTosByPhoneNumberMask(phoneNumberMask);
    }

    @PostMapping(value = "/autocomplete-city", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerAutocompleteTo> autocompleteCity(@RequestParam("term") String cityMask) {
        return super.getCustomerAutocompleteTosByCityMask(cityMask);
    }

    @PostMapping(value = "/autocomplete-payment-type", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaymentType[] autocompletePaymentType() {
        return super.getPaymentTypeAutocomplete();
    }

    @PostMapping(value = "/autocomplete-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public OrderStatus[] autocompleteOrderStatus() {
        return super.getOrderStatusAutocomplete();
    }

    @PostMapping(value = "/autocomplete-order-item-name", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderItemAutocompleteTo> autocompleteOrderItemName(@RequestParam("term") String productNameMask) {
        return super.getOrderItemAutocompleteTosByProductMask(productNameMask);
    }

    @PostMapping(value = "/{id}/add-order-item", produces = MediaType.APPLICATION_JSON_VALUE)
    public void addOrderItem(@PathVariable("id") int orderId) {
        super.addOrderItem(orderId);
    }

    @PostMapping(value = "/{id}/update-status")
    public void updateOrderStatus(@PathVariable("id") int orderId, @RequestParam("status") OrderStatus status) {
        super.updateOrderStatus(orderId, status);
    }

    @PostMapping(value = "/{id}/update-payment-type")
    public void updateOrderPaymentType(@PathVariable("id") int orderId, @RequestParam("payment-type") PaymentType paymentType) {
        super.updateOrderPaymentType(orderId, paymentType);
    }

    @PostMapping(value = "/{id}/update-first-name")
    public void updateFirstName(@PathVariable("id") int orderId, @RequestParam("first-name") String firstName) {
        super.updateFirstName(orderId, firstName);
    }

    @PostMapping(value = "/{id}/update-last-name")
    public void updateLastName(@PathVariable("id") int orderId, @RequestParam("last-name") String lastName) {
        super.updateLastName(orderId, lastName);
    }

    @PostMapping(value = "/{id}/update-phone-number")
    public void updatePhoneNumber(@PathVariable("id") int orderId, @RequestParam("phone-number") String phoneNumber) {
        super.updatePhoneNumber(orderId, phoneNumber);
    }

    @PostMapping(value = "/{id}/update-city")
    public void updateCity(@PathVariable("id") int orderId, @RequestParam("city") String city) {
        super.updateCity(orderId, city);
    }

    @PostMapping(value = "/{id}/update-post-office")
    public void updatePostOffice(@PathVariable("id") int orderId, @RequestParam("post-office") String postOffice) {
        super.updatePostOffice(orderId, postOffice);
    }

    @PostMapping(value = "/{id}/update-total-sum")
    public void updateTotalSum(@PathVariable("id") int orderId, @RequestParam("total-sum") Integer totalSum) {
        super.updateTotalSum(orderId, totalSum);
    }

    @DeleteMapping(value = "/order-item/{orderItemId}")
    public void deleteOrderItem(@PathVariable("orderItemId") int orderItemId) {
        super.deleteOrderItem(orderItemId);
    }
}
