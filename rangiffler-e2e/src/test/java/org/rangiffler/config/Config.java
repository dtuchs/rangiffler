package org.rangiffler.config;

public interface Config {

  static Config getInstance() {
    return LocalConfig.INSTANCE;
  }

  String authUrl();

  String frontUrl();

  String apiUrl();

  String apiJdbcUrl();

}
