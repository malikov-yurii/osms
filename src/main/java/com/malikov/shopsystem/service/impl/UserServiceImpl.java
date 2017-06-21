package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.AuthorizedUser;
import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.repository.UserRepository;
import com.malikov.shopsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.malikov.shopsystem.util.ValidationUtil.checkNotFound;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getByLogin(String login) {
        User user = userRepository.getByLogin(login.toLowerCase());
        if (user == null) {
            throw new UsernameNotFoundException("User with login=" + login + " is not found");
        }
        return user;
    }

    @Override
    public AuthorizedUser loadUserByUsername(String login) throws UsernameNotFoundException {
        return new AuthorizedUser(getByLogin(login));
    }
}
