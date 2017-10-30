package com.malikov.shopsystem.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;

@Import({SpringSecurity.class,SpringDB.class})
@Configuration
@ComponentScan("com.malikov.**.service")
public class SpringApp {
}
