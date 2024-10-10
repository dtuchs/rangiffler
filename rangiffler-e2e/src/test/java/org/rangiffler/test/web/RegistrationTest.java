package org.rangiffler.test.web;

import com.codeborne.selenide.Selenide;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.rangiffler.config.Config;
import org.rangiffler.page.WelcomePage;

public class RegistrationTest {

  private static final Config CFG = Config.getInstance();
  private static final Faker faker = new Faker();

  @Test
  void shouldRegisterNewUser() {
    String newUsername = faker.name().username();
    String password = "12345";
    Selenide.open(CFG.frontUrl(), WelcomePage.class)
        .register()
        .fillRegisterPage(newUsername, password, password)
        .submit()
        .login(newUsername, password)
        .checkThatPageLoaded();
  }
}
