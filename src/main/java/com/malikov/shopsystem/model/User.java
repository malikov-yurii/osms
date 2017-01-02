package com.malikov.shopsystem.model;

import java.util.Set;

public class User extends NamedEntity {

    private String password;

    private Set<Role> roles;
}
