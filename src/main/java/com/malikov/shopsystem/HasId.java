package com.malikov.shopsystem;

/**
 * @author Yurii Malikov
 */
public interface HasId {

    Long getId();

    void setId(Long id);

    default boolean isNew() {
        return getId() == null || getId() == 0;
    }
}
