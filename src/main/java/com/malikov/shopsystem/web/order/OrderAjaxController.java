package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.to.OrderTo;
import com.malikov.shopsystem.util.OrderUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/ajax/profile/orders")
public class OrderAjaxController extends AbstractOrderController {

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
    public ResponseEntity<String> updateOrCreate(@Valid OrderTo orderTo, BindingResult result, HttpEntity<String> httpEntity) {
        String json = httpEntity.getBody();
        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (orderTo.isNew()) {
            super.create(OrderUtil.createNewFromTo(orderTo));
        } else {
            Order order = super.getOrder(orderTo.getId());
            super.update(OrderUtil.updateFromTo(order, orderTo), orderTo.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "{itemId}/change-name")
    public void changeName(@PathVariable("itemId") int itemId, @RequestParam("name") String name) {
        super.changeOrderItemProductName(itemId, name);
    }

    @PostMapping(value = "{itemId}/change-price")
    public void changePrice(@PathVariable("itemId") int itemId, @RequestParam("price") int price) {
        super.changeOrderItemProductPrice(itemId, price);
    }

    @PostMapping(value = "{itemId}/change-quantity")
    public void changeQuantity(@PathVariable("itemId") int itemId, @RequestParam("quantity") int quantity) {
        super.changeOrderItemProductQuantity(itemId, quantity);
    }
}
