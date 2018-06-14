package com.malikov.shopsystem.service.security;

import com.malikov.shopsystem.domain.User;
import com.malikov.shopsystem.repository.UserRepository;
import com.malikov.shopsystem.core.security.AuthorizedUser;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizedUserService implements UserDetailsService {

    private final UserRepository userRepository;

    public AuthorizedUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    public User getAuthorizedUser() {
        String authenticatedUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.getByLogin(authenticatedUserName);
    }

}
