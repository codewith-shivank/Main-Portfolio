package com.shivank.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Shivank Maurya — Portfolio & RAG Knowledge API")
                .version("1.0.0")
                .description("Production Spring Boot REST API and Retrieval-Augmented Generation (RAG) assistant for Shivank Maurya, Full Stack Developer.")
                .contact(new Contact()
                    .name("Shivank Maurya")
                    .email("codewithshivank@gmail.com")
                    .url("https://www.linkedin.com/in/shivank-maurya-21257a303/"))
                .license(new License().name("Apache 2.0")));
    }
}
