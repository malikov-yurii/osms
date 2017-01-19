package com.malikov.shopsystem.web.order;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.to.OrderTo;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = OrderRestController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderRestController extends AbstractOrderController {

    static final String REST_URL = "/rest/profile/orders";

    @GetMapping("/{id}")
    public Order get(@PathVariable("id") int id) {
        return super.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        super.delete(id);
    }

    @GetMapping
    public List<OrderTo> getAll() {
        return super.getAll();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody Order order, @PathVariable("id") int id) {
        super.update(order, id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order> createWithLocation(@RequestBody Order order) {
        Order created = super.create(order);

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uriOfNewResource).body(created);
    }
}