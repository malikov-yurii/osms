package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_users")
public class User extends NamedEntity {

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "osms_user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;


    public User() {}

    public User(Long id, String name, String password, Role... roles) {
        super(id, name);
        this.password = password;
        this.roles = new HashSet<>();
        Collections.addAll(this.roles, roles);
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(password, user.password) &&
                Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), password, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "login='" + name + '\'' +
                ", roles=" + roles +
                '}';
    }
}
