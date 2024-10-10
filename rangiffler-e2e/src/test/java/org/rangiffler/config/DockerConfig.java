package org.rangiffler.config;

import com.codeborne.selenide.Configuration;
import org.openqa.selenium.chrome.ChromeOptions;

public class DockerConfig implements Config {

  static final DockerConfig INSTANCE = new DockerConfig();

  static {
    Configuration.browserSize = "1920x1200";
    Configuration.remote = "http://selenoid:4444/wd/hub";
    Configuration.timeout = 10000;
    Configuration.browser = "chrome";
    Configuration.browserVersion = "127.0";
    Configuration.pageLoadStrategy = "eager";
    Configuration.browserCapabilities = new ChromeOptions().addArguments("--no-sandbox");
  }

  private DockerConfig() {
  }

  @Override
  public String frontUrl() {
    return "http://client.rangiffler.dc";
  }

  @Override
  public String apiUrl() {
    return "http://api.rangiffler.dc:8080";
  }

  @Override
  public String authUrl() {
    return "http://auth.rangiffler.dc:9000";
  }

  @Override
  public String apiJdbcUrl() {
    return "jdbc:mysql://rangiffler-mysql:3306/rangiffler-api?serverTimezone=UTC";
  }

  @Override
  public String allureDockerUrl() {
    return System.getenv("ALLURE_DOCKER_API");
  }
}
