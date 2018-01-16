package com.malikov.shopsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

/**
 * @author Oleh Surkov
 * @version 0.1
 */
@Import({SpringSecurity.class, SpringDB.class})
@Configuration
@EnableScheduling
@ComponentScan(
        basePackages = {
                "com.malikov.shopsystem.service",
                "com.malikov.shopsystem.mapper"
        })
public class SpringApp {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
