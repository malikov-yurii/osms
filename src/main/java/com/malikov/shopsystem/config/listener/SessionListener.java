package com.malikov.shopsystem.config.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * @author Yurii Malikov
 */
public class SessionListener implements HttpSessionListener {

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        event.getSession().setMaxInactiveInterval(235*60);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
    }

}