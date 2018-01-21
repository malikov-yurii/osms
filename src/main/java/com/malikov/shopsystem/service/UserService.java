package com.malikov.shopsystem.service;

import com.malikov.shopsystem.AuthorizedUser;
import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public AuthorizedUser loadUserByUsername(String login) throws UsernameNotFoundException {
        return new AuthorizedUser(getByLogin(login));
    }

    public User getByLogin(String login) {

        User user = userRepository.getByLogin(login.toLowerCase());
        if (user == null) {
            throw new UsernameNotFoundException("User with login=" + login + " was not found");
        }

        return user;
    }

    public List<User> getPage(int pageNumber, int pageCapacity) {
        return userRepository.findAll(new PageRequest(pageNumber, pageCapacity)).getContent();
    }

}
