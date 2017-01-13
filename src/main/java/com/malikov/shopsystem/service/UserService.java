package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.to.UserTo;

public interface UserService extends Service<User> {

    User getByLogin(String login);

    void update(UserTo userTo);
}
