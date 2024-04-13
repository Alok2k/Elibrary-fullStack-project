package com.alok.Springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.server.mvc.RepresentationModelProcessorInvoker;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
public class SecurityConfiguration {



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF
        http.csrf().disable();

        // Protect endpoints at /api/type/secure
        http.authorizeRequests(configurer -> configurer
                .antMatchers("/api/books/secure/**")
                .authenticated()
        ).oauth2ResourceServer().jwt();

        // Adding CORS filter
        http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Forcing a non-empty response body for 401s to make response friendly
        Okta.configureResourceServer401ResponseBody(http);

        // Return the SecurityFilterChain bean
        return http.build();
    }
}
