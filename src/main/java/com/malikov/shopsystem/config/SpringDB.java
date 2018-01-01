package com.malikov.shopsystem.config;

import com.google.common.collect.ImmutableMap;
import org.apache.tomcat.jdbc.pool.PoolConfiguration;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * @author Oleh Surkov
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.malikov.shopsystem.repository")
public class SpringDB {

    @Bean
    public DataSource dataSource() {
        PoolConfiguration poolConfiguration = new PoolProperties();
        poolConfiguration.setDriverClassName("com.mysql.jdbc.Driver");
        poolConfiguration.setUsername("malikovs_gilder");
        poolConfiguration.setPassword("tele230786");
        poolConfiguration.setUrl("jdbc:mysql://malikovs.mysql.ukraine.com.ua:3306/malikovs_gilder");
        poolConfiguration.setRemoveAbandoned(true);
        poolConfiguration.setMaxWait(20000);
        poolConfiguration.setTestWhileIdle(true);
        poolConfiguration.setValidationQuery("SELECT 1 FROM osms_users");
        poolConfiguration.setTestOnBorrow(true);
        poolConfiguration.setMaxActive(10);
        poolConfiguration.setMinIdle(2);
        poolConfiguration.setMaxIdle(5);
        poolConfiguration.setInitialSize(2);
        poolConfiguration.setTestOnConnect(true);
        return new org.apache.tomcat.jdbc.pool.DataSource(poolConfiguration);
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("com.malikov.**.model");
        em.setJpaPropertyMap(ImmutableMap.of("hibernate.formal_sql", "false", "hibernate.use_sql_comments",
                "false"));
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
        jpaTransactionManager.setDataSource(dataSource());
        jpaTransactionManager.setEntityManagerFactory(entityManagerFactory);
        return jpaTransactionManager;
    }

    private Properties additionalProperties() {
        Properties properties = new Properties();
        return properties;
    }

}
