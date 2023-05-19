const { default: AllureReporter } = require("@wdio/allure-reporter");
const { assert } = require("chai");

class GooglePlayPage {
  get googlePlayTitle() {
    return $('//h1[@itemprop="name"]//span');
  }

  checkGooglePlayTitle() {
    AllureReporter.addStep(
      "Проверка заголовка страницы Google Play с приложением EAPTEKA"
    );
    browser.switchWindow("https://play.google.com/");
    this.googlePlayTitle.waitForDisplayed({
      timeout: 10000,
      timeoutMsg:
        "Заголовок Google Play для приложения EAPTEKA не отображается!",
    });
    const title = this.googlePlayTitle.getText();
    assert.include(
      title,
      "ЕАПТЕКА — онлайн аптека",
      "Некорректный заголовок в браузере для вкладки Google Play с приложением EAPTEKA!"
    );
  }
}

module.exports = new GooglePlayPage();
