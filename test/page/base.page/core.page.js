const { default: AllureReporter } = require("@wdio/allure-reporter");

class CorePage {
  get buttonScrollUp() {
    return $('//div[@class="toTop"]');
  }

  get buttonAcceptCookies() {
    return $('//*[@class="cookie-informer-bar__button"]');
  }

  get buttonOpenMobileMenu() {
    return $('//div[@class="hamburger hamburger--squeeze"]');
  }

  get goodsCart() {
    return $(
      '//section[@class="header__tools"]//a[contains(@class, "header-basket header--cart")]'
    );
  }

  get phoneForUsers() {
    return $('//div[@class="header__call call"]//a[@class="call__left tel"]');
  }

  get phoneForBusiness() {
    return $('//div[@class="header__call call"]//a[@class="call__right tel"]');
  }

  get buttonCloseNotification() {
    return $('//button[@class="notification__close"]');
  }

  get allowGeoLocationMobileAndroidChrome() {
    return $('//android.widget.Button[@text="Allow"]');
  }

  get buttonCloseBanner() {
    return $(
      '//div[contains(@class, "banner")]//button[contains(@class, "close")]'
    );
  }

  get buttonCloseMobileAppBanner() {
    return $('//div[@class="mobile-app"]//a[contains(@class, "close")]');
  }

  acceptCookies() {
    AllureReporter.addStep('Нажатие кнопки "Принять cookie"');
    this.buttonAcceptCookies.waitForClickable({
        timeout: 10000,
        timeoutMsg: 'Кнопка "Принять cookie" в корзине не отображается или недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonAcceptCookies);
}

  checkPhoneForBusiness() {
    AllureReporter.addStep(
      "Проверка отображения номера телефона для организаций и возможности нажатия на него"
    );
    this.phoneForBusiness.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Кнопка телефона круглосуточной поддержки для организаций в Москве не отображается или недоступна для клика!",
    });
    wdioExpect(this.phoneForBusiness).toHaveAttributeContaining(
      "href",
      "tel:7",
      {
        message:
          "Телефон в шапке не содержит ссылку на телефон для переадресации в приложения для звонка!",
      }
    );
  }

  checkPhoneForUsers() {
    AllureReporter.addStep(
      "Проверка отображения номера горячей линии и возможности нажатия на него"
    );
    this.phoneForUsers.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Кнопка телефона круглосуточной поддержки для пользователей в Москве не отображается или недоступна для клика!",
    });
    wdioExpect(this.phoneForUsers).toHaveAttributeContaining("href", "tel:7", {
      message:
        "Телефон в шапке не содержит ссылку на телефон для переадресации в приложения для звонка!",
    });
  }

  clickButtonCart() {
    AllureReporter.addStep('Нажатие на кнопку "Корзина"');
    this.goodsCart.waitForClickable({
      timeout: 15000,
      timeoutMsg: 'Кнопка "Корзина" недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.goodsCart);
  }

  openMobileMenu() {
    AllureReporter.addStep("Открытие мобильного меню");
    this.buttonOpenMobileMenu.waitForClickable({
      timeout: 10000,
      timeoutMsg: "Кнопка открытия мобильного меню недоступна для клика!",
    });
    browser.execute("arguments[0].click();", this.buttonOpenMobileMenu);
  }

  clickButtonScrollToTop() {
    AllureReporter.addStep('Нажатие на кнопку "Наверх"');
    this.buttonScrollUp.waitForClickable({
      timeout: 10000,
      timeoutMsg: "Кнопка Наверх недоступна для клика!",
    });
    browser.execute("arguments[0].click();", this.buttonScrollUp);
  }

  tryToCloseNotifications() {
    AllureReporter.addStep("Закрытие всех уведомлений");
    try {
      while (this.buttonCloseNotification.isExisting() === true) {
        this.buttonCloseNotification.waitForClickable({
          timeout: 5000,
          timeoutMsg: "Кнопка закрытия уведомления недоступна для клика!",
        });
        this.buttonCloseNotification.click();
      }
    } catch (error) {}
  }

  tryToCloseHeaderBanner() {
    AllureReporter.addStep("Закрытие баннера в шапке");
    try {
      this.buttonCloseBanner.waitForClickable({
        timeout: 5000,
        timeoutMsg: "Кнопка закрытия баннера недоступна для клика!",
      });
      this.buttonCloseBanner.click();
    } catch (error) {}
  }

  tryToCloseMobileAppBanner() {
    AllureReporter.addStep("Закрытие мобильного баннера в шапке");
    try {
      this.buttonCloseMobileAppBanner.waitForClickable({
        timeout: 5000,
        timeoutMsg: "Кнопка закрытия мобильного баннера недоступна для клика!",
      });
      this.buttonCloseMobileAppBanner.click();
    } catch (error) {}
  }

  allowGeoLocationOnMobileChrome() {
    AllureReporter.addStep(
      "Согласие на разрешение сайте отслеживания геолокации в мобильном хроме"
    );
    browser.switchContext("NATIVE_APP");
    this.allowGeoLocationMobileAndroidChrome.click();
    browser.switchContext("CHROMIUM");
  }
}

module.exports = new CorePage();
