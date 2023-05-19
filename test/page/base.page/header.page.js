const { default: AllureReporter } = require("@wdio/allure-reporter");
const { assert } = require("chai");

class HeaderPage {
  get header() {
    return $('//div[@class="nav"]');
  }

  get buttonSignIn() {
    return this.header.$('.//a[.="Вход"]');
  }

  get buttonPersonalAccount() {
    return this.header.$('//*[contains(@href, "/personal/") and .="Личный кабинет"]');
  }

  get currentCityTitle() {
    return this.header.$('.//span[@class="select_title"]');
  }

  get buttonLogout() {
    return $(
      '//a[contains(text(),"Выход") and contains(@href,"/?logout=yes")]'
    );
  }

  get buttonPharmacies() {
    return this.header.$('.//a[@href="/company/pickup/"]');
  }

  get buttonCheckOrder() {
    return this.header.$('.//a[contains(@href, "/personal/order/status")]');
  }

  get buttonDelivery() {
    return this.header.$('.//a[contains(.,"Доставка")]');
  }

  get buttonEconomy() {
    return this.header.$('.//a[contains(., "Экономия")]');
  }

  get buttonCareer() {
    return this.header.$('.//a[.="Карьера"]');
  }

  clickButtonEconomy() {
    AllureReporter.addStep('Нажатие на кнопку "Экономия до 10%"');
    this.buttonEconomy.waitForClickable({
      timeout: 10000,
      timeoutMsg: 'Кнопка "Экономия" не отображается или недоступна для клика!',
    });
    this.buttonEconomy.click();
  }

  getDeliveryAroundTheClockLink() {
    AllureReporter.addStep('Получение ссылки из кнопки "Доставка 24/7"');
    this.buttonDelivery.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Кнопка Доставка недоступна для клика!",
    });
    return this.buttonDelivery.getAttribute("href");
  }

  assertMoscowDeliveryLink() {
    AllureReporter.addStep(
      'Проверка корректности ссылки в кнопке "Доставка 24/7"'
    );
    assert.include(
      this.getDeliveryAroundTheClockLink(),
      "/company/delivery/",
      "Некорректная ссылка в кнопке Доставка 24/7 в Москве!"
    );
  }

  assertSpbDeliveryLink() {
    AllureReporter.addStep(
      'Проверка корректности ссылки в кнопке "Доставка 24/7"'
    );
    assert.include(
      this.getDeliveryAroundTheClockLink(),
      "/spb/company/delivery/",
      "Некорректная ссылка в кнопке Доставка 24/7 в Санкт-Петербурге!"
    );
  }

  assertTverDeliveryLink() {
    AllureReporter.addStep(
      'Проверка корректности ссылки в кнопке "Доставка 24/7"'
    );
    assert.include(
      this.getDeliveryAroundTheClockLink(),
      "/tver/company/delivery/",
      "Некорректная ссылка в кнопке Доставка 24/7 в Твери!"
    );
  }

  clickButtonWhereIsMyOrder() {
    AllureReporter.addStep('Нажатие на кнопку "Что с моим заказом"');
    this.buttonCheckOrder.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        'Кнопка "Что с моим заказом" не отображается или недоступна для клика!',
    });
    this.buttonCheckOrder.click();
  }

  clickButtonPharmaciesForPickup() {
    AllureReporter.addStep('Нажатие на кнопку "Самовывоз из N аптек"');
    this.buttonPharmacies.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        'Кнопка "Самовывоз из N аптек" не отображается или недоступна для клика!',
    });
    this.buttonPharmacies.click();
  }

  getCountFromButtonPharmaciesForPickup() {
    AllureReporter.addStep(
      'Получение числа аптек из кнопку "Самовывоз из N аптек"'
    );
    return this.buttonPharmacies.getText().replace(/[^\d]/g, "");
  }

  async clickButtonLogout() {
    AllureReporter.addStep('Нажатие на кнопку "Выйти"');
    const buttonLogout = await this.buttonLogout;
    await wdioExpect(buttonLogout).toBeDisplayed({
      wait: 10000,
      message: "Кнопка выхода не отображается",
    });
    await buttonLogout.click();
  }

  clickButtonSignIn() {
    AllureReporter.addStep('Нажатие на кнопку "Вход"');
    this.header.scrollIntoView();
    this.buttonSignIn.waitForClickable({
      timeout: 10000,
      timeoutMsg: 'Кнопка "Вход" не отображается или недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonSignIn);
  }

  checkCityChange(cityName) {
    AllureReporter.addStep("Проверка города после смены региона");
    wdioExpect(this.currentCityTitle).toHaveTextContaining(cityName);
  }

  clickButtonPersonalAccount() {
    AllureReporter.addStep('Нажатие на кнопку "Личный кабинет"');
    this.buttonPersonalAccount.waitForClickable({
      timeout: 15000,
      timeoutMsg:
        'Кнопка "Личный кабинет" не отображается или недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonPersonalAccount);
  }

  checkButtonCareer() {
    AllureReporter.addStep('Проверка кнопки "Карьера" в хедере');
    wdioExpect(this.buttonCareer).toBeClickable({
      message:
        'Кнопка "Карьера" в хедере недоступна для клика или не отображается!',
    });
    wdioExpect(this.buttonCareer).toHaveAttribute("href", "/landing/vacancy/", {
      message: 'Кнопка "Карьера" содержит некорректную ссылку!',
    });
  }
}

module.exports = new HeaderPage();
