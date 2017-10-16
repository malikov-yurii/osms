package com.malikov.shopsystem;

import com.malikov.shopsystem.matcher.ModelMatcher;
import com.malikov.shopsystem.enumtype.Role;
import com.malikov.shopsystem.model.User;

import java.util.Objects;

public class UserTestData {
    public static final User USER = new User(1L, "user", "$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm", Role.ROLE_USER);
    public static final User ADMIN= new User(2L, "admin", "$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm", Role.ROLE_ADMIN, Role.ROLE_USER);

    public static final ModelMatcher<User> MATCHER = ModelMatcher.of(User.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPassword(), actual.getPassword())
                            && Objects.equals(expected.getRoles(), actual.getRoles())
                    )
    );
}
