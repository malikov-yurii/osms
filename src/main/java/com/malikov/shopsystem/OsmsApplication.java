package com.malikov.shopsystem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Optional;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class OsmsApplication {

    private static final Logger log = LoggerFactory.getLogger(OsmsApplication.class);

    public static void main(String[] args) throws UnknownHostException {
        SpringApplication app = new SpringApplication(OsmsApplication.class);
        Environment env = app.run(args).getEnvironment();
        String port = Optional.ofNullable(env.getProperty("server.port")).orElse("8080");
        String applicationName = Optional.ofNullable(env.getProperty("spring.application.name")).orElse("osms");
        log.info("\n----------------------------------------------------------\n\t"
                        + "Application '{}' is running! Access URLs:\n\t"
                        + "Local: \t\thttp://127.0.0.1:{}\n\t"
                        + "External: \thttp://{}:{}\n----------------------------------------------------------",
                applicationName, port,
                InetAddress.getLocalHost().getHostAddress(), port);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
