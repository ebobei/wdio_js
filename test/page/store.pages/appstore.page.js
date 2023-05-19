const { default: AllureReporter } = require("@wdio/allure-reporter");
const chai = require("chai"),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

class AppStorePage {
  get appStoreTitle() {
    return $('//h1[@class="product-header__title app-header__title"]');
  }

  checkAppStoreTitle() {
    AllureReporter.addStep(
      "Проверка заголовка страницы AppStore с приложением EAPTEKA"
    );
    browser.switchWindow("https://apps.apple.com/");
    this.appStoreTitle.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Заголовок AppStore для приложения EAPTEKA не отображается!",
    });
    const title = this.appStoreTitle.getText();
    assert.include(
      title,
      "ЕАПТЕКА - заказ лекарств",
      "Некорректный заголовок в браузере для вкладки AppStore с приложением EAPTEKA!"
    );
  }
}

module.exports = new AppStorePage();
