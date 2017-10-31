package com.malikov.shopsystem.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author Oleh Surkov
 * @version 0.1
 */
@Import({SpringSecurity.class,SpringDB.class})
@Configuration
@ComponentScan("com.malikov.**.service")
public class SpringApp {
}
