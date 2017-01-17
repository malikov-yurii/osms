package com.malikov.shopsystem.web.product;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.to.ProductTo;
import com.malikov.shopsystem.util.ProductUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping(value = "/ajax/profile/products")
public class ProductAjaxController extends AbstractProductController {

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getAll() {
        return super.getAll();
    }

    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") int id) {
        return super.get(id);
    }


    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") int id) {
        super.delete(id);
    }

    @PostMapping
    public ResponseEntity<String> updateOrCreate(@Valid ProductTo productTo, BindingResult result) {
        // TODO change to exception handler
        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (productTo.isNew()) {
            super.create(ProductUtil.createNewFromTo(productTo));
        } else {
            Product product = super.get(productTo.getId());
            super.update(ProductUtil.updateFromTo(product, productTo), productTo.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/filter", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> getBetween(
            @RequestParam(value = "startDate", required = false) LocalDate startDate,
            @RequestParam(value = "startTime", required = false) LocalTime startTime,
            @RequestParam(value = "endDate", required = false) LocalDate endDate,
            @RequestParam(value = "endTime", required = false) LocalTime endTime) {
        return super.getBetween(startDate, startTime, endDate, endTime);
    }
}
