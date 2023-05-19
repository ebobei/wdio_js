const { default: AllureReporter } = require("@wdio/allure-reporter");
const { assert } = require("chai");
const loginData = require("../../testdata/logindata");

class AuthPage {
  get fieldEmail() {
    return $('//input[@name="email"]');
  }

  get fieldPhone() {
    return $('//input[@name="phone"]');
  }

  get fieldPassword() {
    return $('//input[@name="password"]');
  }

  get buttonLogin() {
    return $('//button[@data-test-id="buttonLogin"]');
  }

  get checkboxPolicy() {
    return $(
      '//label[@for="policyCheckbox"]//span[contains(@class, "signin-popup__checkmark")]'
    );
  }

  get buttonSignInViaEMail() {
    return $('//button[.="Войти по почте"]');
  }

  get loginFormTitle() {
    return $('//span[@id="exampleModalLabel"]');
  }

  get buttonRemindPassword() {
    return $('//button[contains(., "Восстановить пароль")]');
  }

  get remindPasswordPopupTitle() {
    return $('//span[@class="modal-title"]');
  }

  get fieldEmailForRecovery() {
    return $('//input[@type="email"]');
  }

  get buttonSend() {
    return $('//button[.="Восстановить пароль"]');
  }

  get buttonConfirmRecovery() {
    return $('//div[@class="modal-body modal-data"]//button[@type="submit"]');
  }

  get successfulRecoveryText() {
    return $('//span[contains(@class, "recovery-success-message")]');
  }

  get buttonGetSms() {
    return $('//*[text()="Получить код по СМС"]');
  }

  get smsCodeInput() {
    return $('//*[@aria-label="Цифра из смс кода 1"]');
  }

  get authorisationForm() {
    return $('//div[@class="modal-content"]');
  }

  get companyPolicy() {
    return $('//*[@href="/company/policy/" and @rel="noopener noreferrer"]');
  }

  get companyContract() {
    return $('//*[@href="/company/contract/" and @rel="noopener noreferrer"]');
  }

  get loyaltyRules() {
    return $('//*[@href="/loyalty/rules/" and @rel="noopener noreferrer"]');
  }

  get soglasieNaRassylku() {
    return $('//*[@href="/landing/soglasie_na_rassylku/" and @rel="noopener noreferrer"]');
  }

  checkCompanyPolicy() {
    AllureReporter.addStep(
      'Проверка, что ссылка "Согласие с политикой конфиденциальности" доступна для клика'
    );
    this.companyPolicy.waitForClickable({
      timeout: 5000,
      timeoutMsg:
      `Ссылка "Согласие с политикой конфиденциальности" не доступна для клика`,
    });
  }

  checkCompanyContract() {
    AllureReporter.addStep(
      'Проверка, что ссылка "Согласие с пользовательским соглашением" доступна для клика'
    );
    this.companyContract.waitForClickable({
      timeout: 5000,
      timeoutMsg:
      `Ссылка "Согласие с пользовательским соглашением" не доступна для клика`,
    });
  }

  checkLoyaltyRules() {
    AllureReporter.addStep(
      'Проверка, что ссылка "Согласие с правилами бонусной программы" доступна для клика'
    );
    this.loyaltyRules.waitForClickable({
      timeout: 5000,
      timeoutMsg:
      `Ссылка "Согласие с правилами бонусной программы" не доступна для клика`,
    });
  }

  checkSoglasieNaRassylku() {
    AllureReporter.addStep(
      'Проверка, что ссылка "Согласие на получение рекламных новостей, акций и персональных предложений" доступна для клика'
    );
    this.soglasieNaRassylku.waitForClickable({
      timeout: 5000,
      timeoutMsg:
       `Ссылка "Согласие на получение рекламных новостей, акций и персональных предложений" не доступна для клика`,
    });
  }

  checkRemindPasswordPopupTitle() {
    AllureReporter.addStep("Проверка заголовка поп-ап для смены пароля");
    assert.equal(
      `${this.remindPasswordPopupTitle.getText()}`,
      "Восстановить пароль",
      "Некорректный заголовок окна ввода E-Mail для восстановления пароля!"
    );
  }

  inputUserEMailForRecovery() {
    AllureReporter.addStep("Ввод почты для восстановления пароля");
    this.fieldEmailForRecovery.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Поле ввода почты для восстановления пароля не отображается!",
    });
    this.fieldEmailForRecovery.setValue(loginData.email);
  }

  clickButtonSend() {
    AllureReporter.addStep(
      'Нажатие на кнопку "Восстановить пароль" на форме восстановления пароля'
    );
    this.buttonSend.waitForClickable({
      timeout: 4000,
      timeoutMsg: 'Кнопка "Восстановить пароль" недоступна для клика!',
    });
    this.buttonSend.click();
  }

  checkSuccessfulRecoveryText() {
    AllureReporter.addStep(
      "Проверка текста после успешной отправки сообщения для восстановления пароля"
    );
    this.successfulRecoveryText.waitForClickable({
      timeout: 5000,
      timeoutMsg:
        "Не отображается текст об успешной отправке ссылки для восстановления пароля на почту",
    });
    let successfulRecoveryText = this.successfulRecoveryText.getText();

    assert.include(
      successfulRecoveryText,
      "Мы отправили ссылку для смены пароля на почту ",
      "Некорректный текст окна уведомления об отправке ссылки для восстановления пароля!"
    );
  }

  clickButtonConfirmRecovery() {
    AllureReporter.addStep(
      "Нажатие на кнопку подтверждения восстановления пароля"
    );
    this.buttonConfirmRecovery.click();
  }

  clickButtonRemindPassword() {
    AllureReporter.addStep('Нажатие на кнопку "Восстановить пароль"');
    this.buttonRemindPassword.waitForClickable({
      timeout: 5000,
      timeoutMsg: 'Кнопка "Восстановить пароль" недоступна для клика!',
    });
    this.buttonRemindPassword.click();
  }

  checkLoginTitle() {
    AllureReporter.addStep(
      "Проверка заголовка на форме авторизации или регистрации"
    );
    this.loginFormTitle.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Форма авторизации или регистрации не отображается!",
    });
  }

  inputLoginEMail(email) {
    AllureReporter.addStep("Ввод электронной почты в качестве логина");
    this.fieldEmail.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Поле ввода электронной почты не отображается!",
    });
    this.fieldEmail.setValue(email);
  }

  inputLoginPhoneNumber(phone) {
    AllureReporter.addStep("Ввод номера телефона в качестве логина");
    this.fieldPhone.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Поле ввода номера телефона не отображается!",
    });
    this.fieldPhone.click();
    const phoneArr = phone.split("").slice(1);
    phoneArr.forEach((num) => {
      this.fieldPhone.addValue(num);
    });
  }

  inputPassword(password) {
    AllureReporter.addStep("Ввод пароля");
    this.fieldPassword.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Поле ввода пароля не отображается!",
    });
    this.fieldPassword.setValue(password);
  }

  selectCheckboxPolicy() {
    AllureReporter.addStep(
      "Отметка согласия с политикой, соглашением и правилами"
    );
    this.checkboxPolicy.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс соглашения с политикой не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.checkboxPolicy);
  }

  checkButtonLoginIsNotClickable() {
    AllureReporter.addStep(
      'Проверка, что кнопка "Войти" не доступна для клика'
    );
    assert.equal(
      this.buttonLogin.isClickable(),
      false,
      'Кнопка "Войти" доступна для клика!'
    );
  }

  clickButtonLogin() {
    AllureReporter.addStep('Нажатие на кнопку "Войти"');
    this.buttonLogin.waitForClickable({
      timeout: 5000,
      timeoutMsg: 'Кнопка "Войти" недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonLogin);
  }

  clickButtonSignInViaEMail() {
    AllureReporter.addStep('Нажатие на кнопку "Войти по почте"');
    this.buttonSignInViaEMail.waitForClickable({
      timeout: 15000,
      timeoutMsg: 'Кнопка "Войти по почте" недоступна для клика!',
    });
    this.buttonSignInViaEMail.click();
  }

  clickButtonGetSms() {
    AllureReporter.addStep('Нажатие на кнопку "Получить код по SMS"');
    this.buttonGetSms.waitForClickable({
      timeout: 5000,
      timeoutMsg: 'Кнопка "Получить код по SMS" недоступна для клика!',
    });
    browser.execute("arguments[0].click();", this.buttonGetSms);
  }

  inputSmsCode(smsCode) {
    AllureReporter.addStep("Ввод кода из sms");
    wdioExpect(this.smsCodeInput).toBeDisplayed({
      message: "Не отображается поле для ввода кода из sms!",
    });
    this.smsCodeInput.scrollIntoView();
    browser.waitUntil(
      () =>
        this.smsCodeInput.getAttribute("class").includes("filled") === false,
      {
        timeout: 5000,
        timeoutMsg: "Поле sms кода не очистилось!",
      }
    );
    this.smsCodeInput.setValue(smsCode);
  }

  inputCorrectSmsCode(smsCode) {
    AllureReporter.addStep("Ввод корректного кода из sms");
    this.inputSmsCode(smsCode);
    this.smsCodeInput.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Отображется поле для ввода кода из sms, после ввода кода!",
      reverse: true,
    });
  }

  inputIncorrectSmsCode() {
    AllureReporter.addStep("Ввод некорректного кода из sms");
    this.inputSmsCode("1111");
    wdioExpect(this.authorisationForm).toHaveTextContaining("Неверный код", {
      message: "Некорректный текст ошибки при вводе некорреткного кода из sms!",
    });
  }
}

module.exports = new AuthPage();
