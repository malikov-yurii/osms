package com.malikov.shopsystem.model;

import com.malikov.shopsystem.enumtype.Role;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("JpaQlInspection")
@Entity
@Table(name = "osms_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "osms_user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;

    public User() {
    }

    public User(Long id, String name, String password, Role... roles) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.roles = new HashSet<>();
        Collections.addAll(this.roles, roles);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

}
