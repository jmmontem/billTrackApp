package com.example.jmmontem.billTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class BillTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillTrackerApplication.class, args);
	}

}
