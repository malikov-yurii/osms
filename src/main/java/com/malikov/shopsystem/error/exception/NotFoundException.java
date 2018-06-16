package com.malikov.shopsystem.error.exception;

public class NotFoundException extends ApplicationException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Class notFoundObjectClass, Long notFoundId) {
        super(String.format("%s id=%d not found", notFoundObjectClass.getSimpleName(), notFoundId));
    }
}
