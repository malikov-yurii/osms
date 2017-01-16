package com.malikov.shopsystem.web.user;

import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.service.UserService;
import com.malikov.shopsystem.to.UserTo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public abstract class AbstractUserController {
    protected final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserService service;

    public List<User> getAll() {
        log.info("getAll");
        return service.getAll();
    }

    public User get(int id) {
        log.info("get " + id);
        return service.get(id);
    }

    public User create(User user) {
        user.setId(null);
        log.info("create " + user);
        return service.save(user);
    }

    public void delete(int id) {
        log.info("delete " + id);
        service.delete(id);
    }

    public void update(User user, int id) {
        user.setId(id);
        log.info("update " + user);
        service.update(user);
    }

    public void update(UserTo userTo) {
        log.info("update " + userTo);
        service.update(userTo);
    }

    public User getLogin(String login) {
        log.info("getByEmail " + login);
        return service.getByLogin(login);
    }

    // TODO: 1/16/2017 Consider necessity of enable/disable user feature
//    public void enable(int id, boolean enabled) {
//        log.info((enabled ? "enable " : "disable ") + id);
//        service.enable(id, enabled);
//    }
}
