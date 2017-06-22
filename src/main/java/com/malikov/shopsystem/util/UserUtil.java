package com.malikov.shopsystem.util;

import com.malikov.shopsystem.dto.UserDto;
import com.malikov.shopsystem.model.Role;
import com.malikov.shopsystem.model.User;

public class UserUtil {

    public static User createNewFromTo(UserDto newUser) {
        return new User(null, newUser.getName(), newUser.getPassword(), Role.ROLE_USER);
    }

    public static UserDto asTo(User user) {
        return new UserDto(user.getId(), user.getName(), user.getPassword());
    }

    public static User updateFromTo(User user, UserDto userDto) {
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        return user;
    }

    public static User prepareToSave(User user) {
        user.setPassword(PasswordUtil.encode(user.getPassword()));
        return user;
    }
}
