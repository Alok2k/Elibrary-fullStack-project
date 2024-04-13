package com.alok.Springbootlibrary.config;

import com.alok.Springbootlibrary.entity.Book;
import com.alok.Springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigin="http://localhost:3001";
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
        HttpMethod[] theUnsupportedActions={HttpMethod.POST,HttpMethod.PATCH,HttpMethod.DELETE,HttpMethod.PUT};
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        disableHttpMethods(Book.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class, config, theUnsupportedActions);
        //Configuring CORS Mapping
        cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigin);
    }


    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config,HttpMethod[] theUnsupportedHttpMethods){
        config.getExposureConfiguration()
                .forDomainType(theClass).
                withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedHttpMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedHttpMethods));

    }

}
