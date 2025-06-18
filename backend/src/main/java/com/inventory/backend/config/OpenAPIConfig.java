package com.inventory.backend.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI inventoryOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Inventory Manager API")
                        .description("API for management")
                        .version("1.0"));
    }
}
