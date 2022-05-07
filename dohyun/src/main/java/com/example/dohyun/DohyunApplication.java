package com.example.dohyun;

import com.example.dohyun.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class DohyunApplication {

	public static void main(String[] args) {
		SpringApplication.run(DohyunApplication.class, args);
	}

}
