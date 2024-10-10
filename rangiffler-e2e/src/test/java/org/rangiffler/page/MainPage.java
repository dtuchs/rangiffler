package org.rangiffler.page;

import com.codeborne.selenide.SelenideElement;
import io.qameta.allure.Step;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class MainPage {

  private final SelenideElement header = $("#root header");
  private final SelenideElement map = $(".worldmap__figure-container");

  @Step("Check that main page loaded")
  public MainPage checkThatPageLoaded() {
    header.should(visible);
    map.should(visible);
    return this;
  }
}
