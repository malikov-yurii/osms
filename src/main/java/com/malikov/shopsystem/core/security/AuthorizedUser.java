package com.malikov.shopsystem.core.security;

import com.malikov.shopsystem.domain.User;
import com.malikov.shopsystem.dto.UserDto;
import com.malikov.shopsystem.error.exception.NotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuthorizedUser extends org.springframework.security.core.userdetails.User {

    private static final long serialVersionUID = 1L;

    private UserDto userDto;

    public AuthorizedUser(User user) {
        super(user.getName(), user.getPassword(), true, true, true, true, user.getRoles());
        this.userDto = new UserDto(user.getId(), user.getName(), user.getPassword());
    }

    public static AuthorizedUser safeGet() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        return (principal instanceof AuthorizedUser) ? (AuthorizedUser) principal : null;
    }

    public static AuthorizedUser get() {
        return Optional.ofNullable(safeGet())
                .orElseThrow(() -> new NotFoundException("No authorized user found."));
    }

    public static Long id() {
        return get().userDto.getId();
    }

    public void update(UserDto newTo) {
        userDto = newTo;
    }

    @Override
    public String toString() {
        return userDto.toString();
    }

}
