package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.User;

public interface UserService extends Service<User> {

    User getByLogin(String login);
}
