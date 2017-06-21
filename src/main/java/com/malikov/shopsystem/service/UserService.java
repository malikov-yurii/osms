package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Created by Yurii_Malikov on 6/21/2017.
 */
public interface UserService extends UserDetailsService {
    User getByLogin(String login);
}
