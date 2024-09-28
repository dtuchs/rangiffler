package org.rangiffler.config;

import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RangifflerApiConfig {

  public static final int MAX_PHOTO_SIZE = Integer.MAX_VALUE;

  @Bean
  public FlywayMigrationStrategy repairFlyway() {
    return flyway -> {
      flyway.repair();
      flyway.migrate();
    };
  }
}
