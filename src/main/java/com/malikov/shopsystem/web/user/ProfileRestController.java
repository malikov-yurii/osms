package com.malikov.shopsystem.web.user;

import com.malikov.shopsystem.AuthorizedUser;
import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.to.UserTo;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ProfileRestController.REST_URL)
public class ProfileRestController extends AbstractUserController {

    static final String REST_URL = "/rest/profile";

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public User get() {
        return super.get(AuthorizedUser.id());
    }

    @DeleteMapping
    public void delete() {
        super.delete(AuthorizedUser.id());
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody UserTo userTo) {
        userTo.setId(AuthorizedUser.id());
        super.update(userTo);
    }

}