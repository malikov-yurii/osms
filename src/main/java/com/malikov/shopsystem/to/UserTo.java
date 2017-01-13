package com.malikov.shopsystem.to;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;
import java.io.Serializable;

public class UserTo implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    @NotEmpty
    private String name;

    @Size(min = 5, max = 64, message = " must between 5 and 64 characters")
    private String password;

    public UserTo() {
    }

    public UserTo(Integer id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isNew() {
        return id == null;
    }

    @Override
    public String toString() {
        return "UserTo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
