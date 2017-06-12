package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.User;

public interface UserRepository extends Repository<User> {

    User getByLogin(String login);

}
