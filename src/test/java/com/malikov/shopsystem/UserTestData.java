package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.model.Role;
import com.malikov.shopsystem.model.User;

import java.util.Objects;

public class UserTestData {
    public static final User USER = new User(1, "User", "$2a$10$Sh0ZD2NFrzRRJJEKEWn8l.92ROEuzlVyzB9SV1AM8fdluPR0aC1ni", Role.ROLE_USER);
    public static final User ADMIN= new User(2, "Admin", "$2a$10$WejOLxVuXRpOgr4IlzQJ.eT4UcukNqHlAiOVZj1P/nmc8WbpMkiju", Role.ROLE_ADMIN, Role.ROLE_USER);

    public static final ModelMatcher<User> MATCHER = ModelMatcher.of(User.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPassword(), actual.getPassword())
                            && Objects.equals(expected.getRoles(), actual.getRoles())
                    )
    );
}
