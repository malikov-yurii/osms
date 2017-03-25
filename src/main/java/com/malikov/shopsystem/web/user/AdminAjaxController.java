package com.malikov.shopsystem.web.user;

import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.to.UserTo;
import com.malikov.shopsystem.util.UserUtil;
import com.malikov.shopsystem.web.ExceptionInfoHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/ajax/admin/users")
public class AdminAjaxController extends AbstractUserController {

    @Autowired
    ExceptionInfoHandler exceptionInfoHandler;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getAll() {
        return super.getAll();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User get(@PathVariable("id") int id) {
        return super.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        super.delete(id);
    }

    @PostMapping
    public ResponseEntity<String> createOrUpdate(@Valid UserTo userTo, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            result.getFieldErrors().forEach(fe -> sb.append(fe.getField()).append(" ").append(fe.getDefaultMessage()).append("<br>"));
            return new ResponseEntity<>(sb.toString(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (userTo.isNew()) {
            super.create(UserUtil.createNewFromTo(userTo));
        } else {
            super.update(userTo);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
// TODO: 3/25/2017 implement method enableUnlimited for Product
//    @PostMapping(value = "/{id}")
//    public void enabled(@PathVariable("id") int id, @RequestParam("enabled") boolean enabled) {
//        super.enableUnlimited(id, enabled);
//    }

}