package com.malikov.shopsystem.config.initializer;

import com.malikov.shopsystem.config.listener.SessionListener;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.filter.HttpPutFormContentFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.*;
import java.util.EnumSet;

/**
 * @author Oleh Surkov
 * @version 0.1
 */
public class WebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);

        servletContext.setInitParameter("spring.profiles.default", "mySql,jpa");
        servletContext.setInitParameter("contextClass",
                "org.springframework.web.context.support.AnnotationConfigWebApplicationContext");
        servletContext.setInitParameter("contextConfigLocation", "com.malikov.shopsystem.config.SpringApp");
        servletContext.addListener("org.springframework.web.context.ContextLoaderListener");
        servletContext.addListener(new SessionListener());

        ServletRegistration.Dynamic servletRegistration = servletContext.
                addServlet("mvc-dispatcher", "org.springframework.web.servlet.DispatcherServlet");
        servletRegistration.setInitParameter("contextConfigLocation", "com.malikov.shopsystem.config.SpringMvc");
        servletRegistration.setInitParameter("contextClass",
                "org.springframework.web.context.support.AnnotationConfigWebApplicationContext");
        servletRegistration.setLoadOnStartup(1);
        servletRegistration.addMapping("/");
        EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD,
                DispatcherType.ERROR);

        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter",
                CharacterEncodingFilter.class);
        encodingFilter.setInitParameter("encoding", "UTF-8");
        encodingFilter.setInitParameter("forceEncoding", "true");
        encodingFilter.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        FilterRegistration.Dynamic securityFilterChain = servletContext.addFilter("springSecurityFilterChain",
                DelegatingFilterProxy.class);
        securityFilterChain.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        FilterRegistration.Dynamic contentFilter = servletContext.addFilter("httpPutFormContentFilter",
                HttpPutFormContentFilter.class);
        contentFilter.addMappingForServletNames(dispatcherTypes, true, "mvc-dispatcher");
    }

    @Override
    protected String[] getServletMappings() {
        return new String[0];
    }

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[0];
    }

}
