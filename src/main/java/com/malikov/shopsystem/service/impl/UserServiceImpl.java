package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.AuthorizedUser;
import com.malikov.shopsystem.model.Role;
import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.repository.UserRepository;
import com.malikov.shopsystem.to.UserTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import static com.malikov.shopsystem.util.UserUtil.prepareToSave;
import static com.malikov.shopsystem.util.UserUtil.updateFromTo;

@Service("userService")
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public AuthorizedUser loadUserByUsername(String login) throws UsernameNotFoundException {
        User u = repository.getByLogin(login.toLowerCase());
        if (u == null) {
            throw new UsernameNotFoundException("User with login=" + login + " is not found");
        }
        return new AuthorizedUser(u);
    }
}
