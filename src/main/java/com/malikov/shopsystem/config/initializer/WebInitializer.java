package com.malikov.shopsystem.config.initializer;

import com.sun.javafx.property.adapter.PropertyDescriptor;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.filter.HttpPutFormContentFilter;

import javax.servlet.*;
import java.util.EnumSet;

/**
 * @author Oleh Surkov
 * @version 0.1
 */
public class WebInitializer implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        servletContext.setInitParameter("spring.profiles.default", "mySql,jpa");
        servletContext.setInitParameter("contextClass", "org.springframework.web.context.support.AnnotationConfigWebApplicationContext");
        servletContext.setInitParameter("contextConfigLocation", "com.malikov.shopsystem.config.SpringApp");
        servletContext.addListener("org.springframework.web.context.ContextLoaderListener");

        ServletRegistration.Dynamic servletRegistration = servletContext.
                addServlet("mvc-dispatcher", "org.springframework.web.servlet.DispatcherServlet");
        servletRegistration.setInitParameter("contextConfigLocation", "com.malikov.shopsystem.config.SpringMvc");
        servletRegistration.setInitParameter("contextClass", "org.springframework.web.context.support.AnnotationConfigWebApplicationContext");
        servletRegistration.setLoadOnStartup(1);
        servletRegistration.addMapping("/");
        EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ERROR);

        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter", CharacterEncodingFilter.class);
        encodingFilter.setInitParameter("encoding", "UTF-8");
        encodingFilter.setInitParameter("forceEncoding", "true");
        encodingFilter.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        FilterRegistration.Dynamic securityFilterChain = servletContext.addFilter("springSecurityFilterChain", DelegatingFilterProxy.class);
        securityFilterChain.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        FilterRegistration.Dynamic contentFilter = servletContext.addFilter("httpPutFormContentFilter", HttpPutFormContentFilter.class);
        contentFilter.addMappingForServletNames(dispatcherTypes, true, "mvc-dispatcher");
    }
}
