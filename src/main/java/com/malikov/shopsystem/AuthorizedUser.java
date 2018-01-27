package com.malikov.shopsystem;

import com.malikov.shopsystem.domain.User;
import com.malikov.shopsystem.dto.UserDto;
import com.malikov.shopsystem.util.UserUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static java.util.Objects.requireNonNull;

public class AuthorizedUser extends org.springframework.security.core.userdetails.User {

    private static final long serialVersionUID = 1L;

    private UserDto userDto;

    public AuthorizedUser(User user) {
        super(user.getName(), user.getPassword(), true, true, true, true, user.getRoles());
        this.userDto = UserUtil.asTo(user);
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
        AuthorizedUser user = safeGet();
        requireNonNull(user, "No authorized user found");
        return user;
    }

    public static Long id() {
        return get().userDto.getId();
    }

    public void update(UserDto newTo) {
        userDto = newTo;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    @Override
    public String toString() {
        return userDto.toString();
    }

}
