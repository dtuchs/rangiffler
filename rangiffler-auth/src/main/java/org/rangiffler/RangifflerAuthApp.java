package org.rangiffler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RangifflerAuthApp {

  public static void main(String[] args) {
    SpringApplication.run(RangifflerAuthApp.class, args);
  }
}
