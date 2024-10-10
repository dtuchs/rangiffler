package org.rangiffler.page;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;
import io.qameta.allure.Step;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class WelcomePage {

  private final SelenideElement loginBtn = $("button[type='button']");
  private final SelenideElement registerBtn = $("a[href*='register']");

  @Step("Open registration page")
  public RegisterPage register() {
    registerBtn.click();
    return new RegisterPage();
  }
}
