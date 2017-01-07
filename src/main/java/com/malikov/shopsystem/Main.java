package com.malikov.shopsystem;

import com.malikov.shopsystem.service.OrderServiceImpl;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Main {
    public static void main(String[] args) throws Exception {
        try (GenericXmlApplicationContext appCtx = new GenericXmlApplicationContext()) {
            appCtx.getEnvironment().setActiveProfiles(Profiles.ACTIVE_DB, Profiles.DB_IMPLEMENTATION);
            appCtx.load("spring/spring-app.xml", "spring/spring-db.xml");
            appCtx.refresh();

            System.out.println(appCtx.getBean(OrderServiceImpl.class).get(1));
        }
    }
}
