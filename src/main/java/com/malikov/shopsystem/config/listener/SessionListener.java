package com.malikov.shopsystem.config.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

    private static final int SESSION_TIMEOUT_235_MINUTES = 235 * 60;

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        event.getSession().setMaxInactiveInterval(SESSION_TIMEOUT_235_MINUTES);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
    }

}