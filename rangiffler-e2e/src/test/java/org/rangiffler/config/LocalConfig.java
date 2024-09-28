package org.rangiffler.config;

public class LocalConfig implements Config {

  static final LocalConfig INSTANCE = new LocalConfig();

  private LocalConfig() {
  }

  @Override
  public String frontUrl() {
    return "http://127.0.0.1:3001";
  }

  @Override
  public String apiUrl() {
    return "http://127.0.0.1:8080";
  }

  @Override
  public String authUrl() {
    return "http://127.0.0.1:9000";
  }

  @Override
  public String apiJdbcUrl() {
    return "jdbc:mysql://127.0.0.1:3306/rangiffler-api?serverTimezone=UTC";
  }
}
