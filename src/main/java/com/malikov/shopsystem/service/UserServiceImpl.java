package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;

public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repository;

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public User update(User user) {
        return repository.save(user);
    }

    @Override
    public User get(int id) {
        return repository.get(id);
    }

    @Override
    public Collection<User> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

    @Override
    public User getByLogin(String login) {
        return repository.getByLogin(login);
    }
}
