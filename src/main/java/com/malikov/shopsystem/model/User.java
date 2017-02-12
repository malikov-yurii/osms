package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@NamedQueries({
        @NamedQuery(name = User.DELETE, query = "DELETE FROM User u WHERE u.id=:id"),
        @NamedQuery(name = User.BY_LOGIN, query = "SELECT u FROM User u WHERE u.name=:login"),
        @NamedQuery(name = User.ALL_SORTED, query = "SELECT u FROM User u ORDER BY u.name"),
})
@Entity
@Table(name = "osms_users")
public class User extends NamedEntity {

    public static final String DELETE = "User.delete";
    public static final String ALL_SORTED = "User.allSorted";
    public static final String BY_LOGIN = "User.getByLogin";

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "osms_user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;

    public User() {
    }

    public User(Integer id, String name, String password, Role... roles) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.roles = new HashSet<>();
        Collections.addAll(this.roles, roles);
    }

    public User(String name, String password, Role... roles) {
        this(null, name, password, roles);
    }

    public User(User u){
        this(u.getId(), u.getName(), u.getPassword (), u.getRoles().toArray(new Role[0]));
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
