const { default: AllureReporter } = require("@wdio/allure-reporter");
const { assert } = require("chai");

class FooterPage {
  get footer() {
    return $('//footer[contains(@class, "footer")]');
  }

  get buttonFeedback() {
    return this.footer.$('.//a[.="Обратная связь"]');
  }

  get buttonPolicy() {
    return this.footer.$('.//a[.="Политика конфиденциальности"]');
  }

  get buttonAboutCompany() {
    return this.footer.$('.//a[contains(., "О компании")]');
  }

  get buttonContract() {
    return this.footer.$('.//a[.="Пользовательское соглашение"]');
  }

  get buttonDelivery() {
    return this.footer.$('.//a[contains(., "Доставка")]');
  }

  get buttonPickup() {
    return this.footer.$('.//a[.="Самовывоз из аптек"]');
  }

  get buttonPayment() {
    return this.footer.$('.//a[.="Оплата"]');
  }

  get buttonEntity() {
    return this.footer.$('.//a[.="Юридическим лицам"]');
  }

  get buttonOurSupplier() {
    return this.footer.$('.//a[.="Поставщики"]');
  }

  get buttonGoods() {
    return this.footer.$('.//a[contains(., "Лекарства и БАД")]');
  }

  get buttonBeautyAndHygiene() {
    return this.footer.$('.//a[contains(., "Красота")]');
  }

  get buttonLenses() {
    return this.footer.$('.//a[.="Линзы"]');
  }

  get buttonMotherAndKids() {
    return this.footer.$('.//a[.="Мать и дитя"]');
  }

  get buttonMedical() {
    return this.footer.$('.//a[.="Медицинские товары"] | .//a[.="Медтовары"]');
  }

  get buttonOrthopedicProducts() {
    return this.footer.$('.//a[.="Ортопедические изделия"]');
  }

  get phoneNumbersInFooterCollection() {
    return this.footer.$$('.//a[@class="phone-num"]');
  }

  get buttonAds() {
    return this.footer.$('.//a[contains(., "Реклама на сайте")]');
  }

  get buttonCareer() {
    return this.footer.$('.//a[.="Карьера"]');
  }

  get buttonAppStore() {
    return $('//a[@class="app-link"]//img[@alt="app-store"]');
  }

  get buttonGooglePlay() {
    return $('//a[@class="app-link"]//img[@alt="google-play"]');
  }

  get buttonFacebook() {
    return $('//a[contains(@class, "social") and contains(@href, "facebook")]');
  }

  get buttonVK() {
    return $('//*[contains(@class, "social") and contains(@href, "vk")]');
  }

  get buttonOK() {
    return $('//*[contains(@class, "social") and contains(@href, "ok")]');
  }

  get buttonTG() {
    return $('//*[contains(@class, "social") and contains(@href, "tg")]');
  }

  get buttonZEN() {
    return $('//*[contains(@class, "social") and contains(@href, "zen")]');
  }

  get companyAddress() {
    return $('//div[@itemtype="http://schema.org/LocalBusiness"]');
  }

  get buttonCompany() {
    return this.footer.$('.//a[.="Компания"]');
  }

  get buttonCatalog() {
    return this.footer.$('.//a[.="Каталог товаров"]');
  }

  get buttonLoyalty() {
    return this.footer.$('.//a[.="Программа лояльности"]');
  }

  clickButtonCatalog() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Каталог товаров" в футере мобильной версии'
    );
    this.buttonCatalog.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Каталог товаров" в футере мобильной версии недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonCatalog);
  }

  clickButtonCompany() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Компания" в футере мобильной версии'
    );
    this.buttonCompany.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Компания" в футере мобильной версии недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonCompany);
  }

  getCompanyAddress() {
    AllureReporter.addStep(
      "Получение адреса компании в футере на главной странице"
    );
    this.companyAddress.waitForDisplayed({
      timeout: 10000,
      timeoutMsg:
        "Адрес компании в футере на главной странице не отображается!",
    });
    return this.companyAddress.getText().split(`Адрес: `)[1].split(";")[0];
  }

  checkButtonVK() {
    AllureReporter.addStep(
      "Проверка корректности ссылки на Вконтакте в футере"
    );
    this.buttonVK.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Вконтакте" в футере недоступна для клика или не отображается!',
    });
    assert.equal(
      `${this.buttonVK.getAttribute("href")}`,
      "/~social_vk",
      "Некорректная ссылка в кнопке vk в футере"
    );
  }

  checkButtonTG() {
    AllureReporter.addStep(
      "Проверка корректности ссылки на Вконтакте в футере"
    );
    this.buttonTG.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Telegram" в футере недоступна для клика или не отображается!',
    });
    assert.equal(
      `${this.buttonTG.getAttribute("href")}`,
      "/~social_tg",
      "Некорректная ссылка в кнопке tg в футере"
    );
  }

  checkButtonOK() {
    AllureReporter.addStep(
      "Проверка корректности ссылки на Вконтакте в футере"
    );
    this.buttonOK.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Одноклассники" в футере недоступна для клика или не отображается!',
    });
    assert.equal(
      `${this.buttonOK.getAttribute("href")}`,
      "/~social_ok",
      "Некорректная ссылка в кнопке ok в футере"
    );
  }

  checkButtonZEN() {
    AllureReporter.addStep(
      "Проверка корректности ссылки на Вконтакте в футере"
    );
    this.buttonZEN.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Яндекс ZEN" в футере недоступна для клика или не отображается!',
    });
    assert.equal(
      `${this.buttonZEN.getAttribute("href")}`,
      "/~social_zen",
      "Некорректная ссылка в кнопке zen в футере"
    );
  }

  checkButtonFacebook() {
    AllureReporter.addStep("Проверка корректности ссылки на facebook в футере");
    this.buttonFacebook.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Facebook" в футере недоступна для клика или не отображается!',
    });
    assert.equal(
      `${this.buttonFacebook.getAttribute("href")}`,
      "https://www.facebook.com/sbereapteka",
      "Некорректная ссылка в кнопке facebook в футере"
    );
  }

  clickButtonGooglePlay() {
    AllureReporter.addStep('Нажатие на кнопку "Google Play" в футере');
    this.buttonGooglePlay.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Google Play" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonGooglePlay);
  }

  clickButtonAppStore() {
    AllureReporter.addStep('Нажатие на кнопку "App Store" в футере');
    this.buttonAppStore.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "App Store" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonAppStore);
  }

  checkButtonCareer() {
    AllureReporter.addStep('Проверка кнопки "Карьера" в футере');
    wdioExpect(this.buttonCareer).toBeClickable({
      message:
        'Кнопка "Карьера" в футере недоступна для клика или не отображается!',
    });
    wdioExpect(this.buttonCareer).toHaveAttribute("href", "/landing/vacancy/", {
      message: 'Кнопка "Карьера" содержит некорректную ссылку!',
    });
  }

  clickButtonAds() {
    AllureReporter.addStep('Нажатие на кнопку "Реклама на сайте" в футере');
    this.buttonAds.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Реклама на сайте" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonAds);
  }

  checkPhoneNumbersInFooter() {
    AllureReporter.addStep("Проверка номеров телефонов в футере");
    const phonesCollection = this.phoneNumbersInFooterCollection;
    phonesCollection.forEach((element) => {
      let number = element.getAttribute("href");
      assert.include(
        number,
        "tel:",
        "Отсутсвует html5 элемент для переадресации в приложения для звонка!"
      );
    });
  }

  clickButtonOrthopedicProducts() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Ортопедические изделия" в футере'
    );
    this.buttonOrthopedicProducts.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Ортопедические изделия" в категориях недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonOrthopedicProducts);
  }

  clickButtonMedical() {
    AllureReporter.addStep('Нажатие на кнопку "Медицинские товары" в футере');
    this.buttonMedical.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Медицинские товары" в категориях недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonMedical);
  }

  clickButtonMotherAndKids() {
    AllureReporter.addStep('Нажатие на кнопку "Мать и дитя" в футере');
    this.buttonMotherAndKids.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Мать и дитя" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonMotherAndKids);
  }

  clickButtonLenses() {
    AllureReporter.addStep('Нажатие на кнопку "Линзы" в футере');
    this.buttonLenses.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Линзы" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonLenses);
  }

  clickButtonBeautyAndHygiene() {
    AllureReporter.addStep('Нажатие на кнопку "Красота и гигиена" в футере');
    this.buttonBeautyAndHygiene.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Красота и гигиена" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonBeautyAndHygiene);
  }

  clickButtonGoods() {
    AllureReporter.addStep('Нажатие на кнопку "Лекарства и БАД" в футере');
    this.buttonGoods.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Лекарства и БАД" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonGoods);
  }

  clickButtonOurSupplier() {
    AllureReporter.addStep('Нажатие на кнопку "Поставщики" в футере');
    this.buttonOurSupplier.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Поставщики" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonOurSupplier);
  }

  clickButtonEntity() {
    AllureReporter.addStep('Нажатие на кнопку "Юридическим лицам" в футере');
    this.buttonEntity.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Юридическим лицам" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonEntity);
  }

  clickButtonPayment() {
    AllureReporter.addStep('Нажатие на кнопку "Оплата" в футере');
    this.buttonPayment.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Оплата" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonPayment);
  }

  clickButtonPickup() {
    AllureReporter.addStep('Нажатие на кнопку "Самовывоз из аптек" в футере');
    this.buttonPickup.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Самовывоз из аптек" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonPickup);
  }

  clickButtonDelivery() {
    AllureReporter.addStep('Нажатие на кнопку "Доставка" в футере');
    this.buttonDelivery.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Доставка" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonDelivery);
  }

  clickButtonAboutCompany() {
    AllureReporter.addStep('Нажатие на кнопку "О компании" в футере');
    this.buttonAboutCompany.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "О компании" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonAboutCompany);
  }

  clickButtonContract() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Пользовательское соглашение" в футере'
    );
    this.buttonContract.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Пользовательское соглашение" в навбаре недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonContract);
  }

  clickButtonPolicy() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Политика конфиденциальности" в футере'
    );
    this.buttonPolicy.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Политика конфиденциальности" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonPolicy);
  }

  clickButtonFeedback() {
    AllureReporter.addStep('Нажатие на кнопку "Обратная связь" в футере');
    this.buttonFeedback.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Обратная связь" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonFeedback);
  }

  clickButtonLoyalty() {
    AllureReporter.addStep('Нажатие на кнопку "Программа лояльности" в футере');
    this.buttonLoyalty.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        'Кнопка "Программа лояльности" в футере недоступна для клика или не отображается!',
    });
    browser.execute("arguments[0].click();", this.buttonLoyalty);
  }

  checkNoButtonLoyalty() {
    AllureReporter.addStep(
      'Проверка отсутствия кнопки "Программа лояльности" в футере'
    );
    this.buttonLoyalty.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: 'Кнопка "Программа лояльности" отображается в футере!',
      reverse: true,
    });
  }

  scrollToFooter() {
    AllureReporter.addStep("Скролл до футера");
    this.footer.scrollIntoView();
    wdioExpect(this.footer).toBeDisplayedInViewport({
      wait: 3000,
      message: "Футер не отображается в КТ!",
    });
  }
}

module.exports = new FooterPage();
