const { default: AllureReporter } = require('@wdio/allure-reporter');
const loginData = require('../testdata/logindata');
const { assert } = require('chai');

class CompanyPage {
    get feedbackTitle() {return $('//h1[@class="sec-profile__title" and .="Обратная связь"]');}

    get buttonChooseFeedbackTheme() {return $('//form[@action="/company/feedback/"]//span[@class="select_title"]');}

    get themesCollection() {return $$('//form[@action="/company/feedback/"]//ul[@class="select_list"]//li');}

    get fieldName() {return $('//input[@placeholder="Имя Фамилия Отчество"]');}

    get fielfEmail() {return $('//div[@class="sec-order__form-field left"]//input[@placeholder="Электронная почта"]');}

    get fieldPhoneNumber() {return $('//div[@class="sec-order__form-field right"]//input[@placeholder="Номер телефона"]');}

    get fieldFeedback() {return $('//div[@class="sec-order__form-field"]//textarea[@placeholder="Текст сообщения"]');}

    get buttonSendFeedback() {return $('//input[@type="submit"]');}

    get successMessage() {return $('//div[@class="sec-profile__fb-theme-label" and .="Спасибо, ваше сообщение принято."]');}

    get policyTitle() {return $('//*[contains(@href, "/company/policy/") and (.="Политика конфиденциальности")]');}

    get aboutCompanyTitle() {return $('//h1[@class="sec-inner__title" and .="О компании"]');}

    get deliveryTitle() {return $('//h1[@class="sec-inner__title" and .="Доставка лекарств"]');}

    get pickupTitle() {return $('//h1[@class="sec-inner__title" and .="Бесплатный самовывоз из аптек"]');}

    get paymentTitle() {return $('//h1[@class="sec-inner__title" and .="Способы оплаты"]');}

    get buttonCashPayment() {return $('//a[@aria-controls="cash"]');}

    get cashPaymentTitle() {return $('//h2[.="Наличный расчет"]');}

    get buttonCardPayment() {return $('//a[@aria-controls="bank-transfer"]');}

    get cardPaymentTitle() {return $('//h2[.="Безналичный расчет для физических лиц"]');}

    get wholesaleTitle() {return $('//h1[.="Лекарства оптом по безналу"]');}

    get corporateContactBlockTitle() {return $('//div[@class="sec-corporate__side-title"]');}

    get phoneNubmerForOrganizations() {return $('//div[@class="sec-corporate__side-contacts"]//span');}

    get mailForOrganizations() {return $('//div[@class="sec-corporate__side-contacts"]//a');}

    get buttonRecall() {return $('//a[@href="#recall-box"]');}

    get recallTitle() {return $('//div[@class="sec-corporate__recall-title"]');}

    get fieldOrganization() {return $('//input[@name="ORGANIZATION"]');}

    get fieldNameToRecall() {return $('//div[@class="sec-corporate__recall-box"]//input[@name="NAME"]');}

    get fieldEmailToRecall() {return $('//div[@class="sec-corporate__recall-box"]//input[@name="EMAIL"]');}

    get fieldPhoneToRecall() {return $('//div[@class="sec-corporate__recall-box"]//input[@name="PHONE"]');}

    get buttonSubmitRecall() {return $('//div[@class="sec-corporate__recall-box"]//button[@type="submit"]');}

    get recallConfirmedTitle() {return $('//div[@class="sec-corporate__recall-box"]//div[@class="popups__recall-text"]');}

    get supplierCollection() {return $$('//div[@class="partners--item"]');}

    get ourSuppliersTitle() {return $('//h1[@class="sec-inner__title" and .="Наши поставщики"]');}

    get contractTitle() {return $('//*[contains(@href, "/company/contract/") and (.="Пользовательское соглашение")]');}

    get adsTitle() {return $('//h1[@class="sec-inner__title" and .="Реклама на сайте"]');}

    get aboutCompanyParagraphCollection() {return $$('//div[@class="col-12 col-lg-9"]//p');}

    get loyaltyTitle() {return $('//h1[contains(@class, "text-center")]');}

    getAboutCompanyInfo() {
        return this.aboutCompanyParagraphCollection[9].getText();
    }

    checkAdsTitle() {
        AllureReporter.addStep('Проверка заголовка блока "Реклама на сайте"');
        this.adsTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Реклама на сайте" не отображается!'
        });
    }

    checkOurSuppliersTitle() {
        AllureReporter.addStep('Проверка заголовка блока "Наши поставщики"');
        this.ourSuppliersTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Наши поставщики" не отображается!'
        });
    }

    checkSuppliersList() {
        AllureReporter.addStep('Проверка списка поставщиков');
        let len = this.supplierCollection.length;
        assert.isAtLeast(len, 1, "В списке поставщиков не отображается ни одного поставщика!");
    }

    checkRecallConfirmedTitle() {
        AllureReporter.addStep('Проверка заголовка при успешном оформлении заявки на обратный заголовок');
        this.recallConfirmedTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок об успешном оформлении заявки на обратный звонок не отображается!'
        });
        let title = this.recallConfirmedTitle.getText();
        assert.equal(
            title, 
            "Спасибо, Ваша заявка принята.\nОператор свяжется с Вами в течение 15 минут.", 
            "Заголовок информера об успешном оформлении заявки на отображается!"
        );
    }

    clickButtonSubmitRecall() {
        AllureReporter.addStep('Нажатие на кнопку "Заказать звонок"');
        this.buttonSubmitRecall.waitForClickable({
            timeout: 5000, 
            timeoutMsg: 'Кнопка "Заказать звонок" на форме заявки на обратный звонок для организаций не отображается или недоступна для клика!'
        });
        this.buttonSubmitRecall.click();
    }

    fillRecallForm() {
        AllureReporter.addStep('Заполнение формы на обратный звонок');
        this.recallTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Обратный звонок" не отображается!'
        });
        this.fieldOrganization.setValue('Бюро автотестов');
        this.fieldNameToRecall.setValue('Автотестовый автотестер автотостович');
        this.fieldEmailToRecall.setValue(loginData.email);
        this.fieldPhoneToRecall.setValue(loginData.phonenumber);
    }

    checkCorporateContactBlock() {
        AllureReporter.addStep('Проверка блока контактов для организации');
        this.corporateContactBlockTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Связаться с нами" не отображается!'
        });
        let phoneNumber = this.phoneNubmerForOrganizations.getText();
        assert.isNotEmpty(
            phoneNumber,
            "Номер телефона для организаций не отображается!"
        );
        let mail = this.mailForOrganizations.getAttribute('href');
        assert.equal(
            mail,
            "mailto:opt@eapteka.ru",
            "Адрес электронной почты не содержит 'maito:' и не позволяет перейти в приложение почты или указан некорректный адрес электронной почты!"
        );
    }

    clickButtonRecall() {
        AllureReporter.addStep('Нажатие на нопку "Заказать звонок"');
        this.buttonRecall.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Заказать звонок" недоступна для клика!'
        });
        this.buttonRecall.click();
    }

    checkWholesaleTitle() {
        AllureReporter.addStep('Проверка заголовка раздела оптовых продаж');
        this.wholesaleTitle.waitForClickable({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Лекарства оптом по безналу" не отображается!'
        });
    }

    clickButtonCardPayment() {
        AllureReporter.addStep('Нажатие на кнопку "Банковский перевод"');
        this.buttonCardPayment.waitForClickable({
            timeout: 5000, 
            timeoutMsg: 'Кнопка "Банковский перевод" не отображается или недоступна для клика!'
        });
        this.buttonCardPayment.click();
    }

    checkCardPayment() {
        AllureReporter.addStep('Проверка раздела "Способ оплаты: банковский перевод"');
        this.buttonCardPayment.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Способы оплаты: банковский перевод" не отображается!'
        });
        let controlStatus = this.buttonCardPayment.getAttribute('aria-selected');
        assert.equal(controlStatus, "true", "Оплата банковским переводом не выбрана после клика!");
    }

    checkCashPayment() {
        AllureReporter.addStep('Проверка раздела "Способ оплаты: наличные"');
        this.cashPaymentTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Способы оплаты: наличные" не отображается!'
        });
        let controlStatus = this.buttonCashPayment.getAttribute('aria-selected');
        assert.equal(controlStatus, "true", "Оплата наличными не выбрана по умолчанию!");
    }

    checkPaymentTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Способы оплаты"');
        this.paymentTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Способы оплаты" не отображается!'
        });
    }

    checkPickupTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Самовывоз из аптек"');
        this.pickupTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Самовывоз из аптек" не отображается!'
        });
    }

    checkDeliveryTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Доставка"');
        this.deliveryTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Доставка" не отображается!'
        });
    }

    checkAboutCompanyTitle() {
        AllureReporter.addStep('Проверка заголовка "О компании"');
        this.aboutCompanyTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "О компании" не отображается!'
        });
    }
        
    checkContractTitle() {
        AllureReporter.addStep('Проверка заголовка "Пользовательское соглашение"');
        this.contractTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Пользовательское соглашение" не отображается!'
        });
    }

    checkPolicyTitle() {
        AllureReporter.addStep('Проверка заголовка "Политика конфиденциальности"');
        this.policyTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Политика конфиденциальности" не отображается!'
        });
    }

    checkSuccessMessage() {
        AllureReporter.addStep('Проверка сообщения об успешной отправке отзыва');
        this.successMessage.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Сообщение об успешной отправке отзыва не отображается!'
        });
    }

    clickButtonSendFeedback() {
        AllureReporter.addStep('Нажатие на кнопку "Отправить отзыв"');
        this.buttonSendFeedback.waitForClickable({
            timeout: 5000, 
            timeoutMsg: 'Кнопка "Отправить отзыв" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.buttonSendFeedback);
    }

    checkFeedBackTitle() {
        AllureReporter.addStep('Проверка заголовка "Обратная связь"');
        this.feedbackTitle.waitForDisplayed({
            timeout: 5000, 
            timeoutMsg: 'Заголовок "Обратная связь" не отображается!'
        });
    }

    checkLoyaltyRulesTitle() {
        AllureReporter.addStep('Проверка заголовка договора об участии в программе лояльности');
        wdioExpect(this.loyaltyTitle).toHaveTextContaining(
            'ДОГОВОР\nоб участии в программе лояльности ЕАПТЕКА\n(ПУБЛИЧНАЯ ОФЕРТА)',
            {message: 'Заголовок договора об участии в программе лояльности не отображается!'}
        );
    }

    fillFeedbackForm() {
        AllureReporter.addStep('Заполнение формы отзыва');
        this.chooseTheme();
        this.fillName();
        this.fillEmail();
        this.fillPhoneNumber();
        this.fillFeedback();
    }

    chooseTheme() {
        AllureReporter.addStep('Выбор темы отзыва');
        browser.waitUntil(
            () => this.buttonChooseFeedbackTheme.isDisplayed() === true,
            () => this.buttonChooseFeedbackTheme.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Кнопка выбора тем не отображается или недоступна для клика!'
            }
        );
        this.buttonChooseFeedbackTheme.click();
        const themes = this.themesCollection;
        let len = themes.length;

        const randomTheme = themes[Math.floor(Math.random()*len)];
        browser.waitUntil(
            () => randomTheme.isDisplayed() === true,
            () => randomTheme.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Тема обращения в списке тем не отображается или недоступна для клика!'
            }
        );
        randomTheme.click();
    }

    fillName() {
        AllureReporter.addStep('Заполнение ФИО в форме отзыва');
        browser.waitUntil(
            () => this.fieldName.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Поле ввода ФИО не отображается!'
            }
        );
        this.fieldName.setValue('Автотестированное Автотестирование Автотестировича');
    }

    fillEmail() {
        AllureReporter.addStep('Заполнение электронной почты в форме отзыва');
        browser.waitUntil(
            () => this.fielfEmail.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Поле ввода Email не отображается!'
            }
        );
        this.fielfEmail.setValue(loginData.email);
    }

    fillPhoneNumber() {
        AllureReporter.addStep('Заполнение номера телефона в форме отзыва');
        this.fieldPhoneNumber.addValue('9991721772');
    }

    fillFeedback() {
        AllureReporter.addStep('Заполнение текста отзыва');
        browser.execute("arguments[0].value = 'Этот отзыв написан автотестом'", this.fieldFeedback);
    }
}

module.exports = new CompanyPage();