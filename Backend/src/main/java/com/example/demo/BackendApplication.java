package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
	
@ComponentScan( { "com.example.demo.controller" } )
@EnableCaching
@SpringBootApplication( exclude = { SecurityAutoConfiguration.class } )
@ComponentScan(basePackages = {"com.example.demo", "com.example.demo.service"})
public class BackendApplication {

	public static void main(String[] args) {	
		SpringApplication.run(BackendApplication.class, args);
	}
	
}
