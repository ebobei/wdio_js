const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert
    , expect = chai.expect;
const searchData = require('../../testdata/searchdata');
const userHelper = require("../../helpers/user.helper");
const basePage = require("../base.page/base.page");

class GoodsPageProductDetail {
    get detailBlock() {return $('//div[@data-view="productDetail"]');}

    get goodsTitle() {return $('//div[@class="new-offer-box"]//h1[contains(., "")]');}

    get availabilityStatus() {return $('//p[@class="offer-tools__status offer-tools__status_good"]');}

    get fieldPhoneNumber() {return $('//input[@name="phone"]');}

    get buttonPhoneNumberSubmit() {return $('//*[@data-action="offer-notification"]//div[@class="form-group notif-form--field"]//button[@type="submit"]');}

    get mobileFieldPhoneNumber() {return $('//div[contains(@class, "offer-card__notif")]//input[@name="phone"]');}

    get mobileButtonPhoneNumberSubmit() {return $('//div[contains(@class, "offer-card__notif")]//button[@type="submit"]');}

    get successfulSmsSendingMessage() {return $('//div[@class="notif-form--label"]');}

    get buttonAddToFavorites() {return this.detailBlock.$('.//a[@class="like"]');}

    get manufacturerLink() {return $('//div[contains(@class, "description__item")]//a[contains(@href, "/goods/manufacturer/")]');}

    get activeSubstanceLink() {return $('//div[contains(@class, "description__item")]//a[contains(@href, "/goods/active_ingredient/")]');}

    get allFormsLink() {return $('//div[contains(@class, "description__item")]//a[contains(@href, "/goods/drugs/")]');}

    get buttonAddToCart() {return $('//div[@class="offer-tools__buy"]//button[@data-action="addToCart"]');}

    get buttonInCart() {return this.detailBlock.$('.//a[@data-test-id="buttonInCart"]');}

    get buttonQuantityInCart() {return this.detailBlock.$('.//div[@class="cart-counter offer-tools__counter"]//input');}

    get goodsPrice() {return this.detailBlock.$('.//span[contains(@class, "price")]');}

    get dispensedStrictlyByPrescriptionAlert() {return $('//div[@data-view="productDetail"]//span[@tooltip]');}

    get navigationBarMainTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="item"]//a');}

    get activeSubstanceCollection() {return $$(`//a[text()="${searchData.activeSubstance}"]`);}

    get bonusCount() {return this.detailBlock.$('.//div[@class="card-bonus__count"]');}

    get goodsCartCounter() {return this.detailBlock.$('.//div[contains(@class, "cart-counter")]//input');}

    checkCountActiveSubstanceMentioning() {
        AllureReporter.addStep('Проверка количества упоминаний активного вещества в КТ');
        wdioExpect(this.activeSubstanceCollection).toBeElementsArrayOfSize({
            gte: 2,
            message: 'Количество упоминаний действующего вещества меньше 2!'
        });
    }

    clickNavigationBarMainTab() {
        AllureReporter.addStep('Нажатие на вкладку "Основное"');
        this.navigationBarMainTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Основное" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarMainTab);
    }

    //TODO: Можно сделать динамически, брать бренд из соответствующей вкладки и проверять инклюд
    checkGoodsTitleContainsBrand() {
        AllureReporter.addStep('Проверка содержания бренда в наименовании лекарства');
        expect(this.getGoodsName()).to.include(searchData.goodsBrandName);
    }

    checkDispensedStrictlyByPrescriptionHint() {
        AllureReporter.addStep('Проверка текста предупреждения об отпуске по рецепту');
        assert.equal(
            `${this.dispensedStrictlyByPrescriptionAlert.getAttribute("tooltip")}`,
            "Лекарство можно получить только в аптеке по рецепту. После этого мы должны будем забрать рецепт или оставить на нем отметку о продаже",
            "Некорректная текстовка подсказки предупреждения об отпуске по рецепту!"
        );
        // TODO: найти способ проверки отображения тултипа, так-как убран атрибут aria-describedby
        // this.dispensedStrictlyByPrescriptionAlert.moveTo();
    }

    checkDispensedStrictlyByPrescriptionAlert() {
        AllureReporter.addStep('Проверка отображения предупреждения об отпуске строго по рецепту');
        this.dispensedStrictlyByPrescriptionAlert.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Предупреждение об отпуске строго по рецепту не отображается в КТ!'
        });
        assert.equal(
            `${this.dispensedStrictlyByPrescriptionAlert.getText()}`,
            "Продажа строго по рецепту в аптеке",
            "Некорректная формулировка предупреждения об отпуске строго по рецепту!"
        );
    }

    checkDispensedByPrescriptionAlert() {
        AllureReporter.addStep('Проверка отображения предупреждения об отпуске по рецепту');
        this.dispensedStrictlyByPrescriptionAlert.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Предупреждение об отпуске по рецепту не отображается в КТ!'
        });
        assert.equal(
            `${this.dispensedStrictlyByPrescriptionAlert.getText()}`,
            "Только самовывоз",
            "Некорректная формулировка предупреждения об отпуске по рецепту!"
        );
    }

    getGoodsPrice() {
        AllureReporter.addStep('Получение цены товара');
        const price = this.goodsPrice.getText();
        return price.split(' ')[0];
    }

    clickButtonInCart() {
        AllureReporter.addStep('Нажатие на кнопку "В корзине"');
        this.buttonInCart.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "В корзине" не доступна для клика!'
        });
        this.buttonInCart.click();
    }

    checkButtonInCart() {
        AllureReporter.addStep('Проверка кнопки "В корзине"');
        basePage.core.tryToCloseNotifications();
        this.buttonInCart.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "В корзине" не отображается!'
        });
        const text = this.buttonQuantityInCart.getValue();
        assert.isAbove(parseInt(text), 0, "Некорректное число товаров после добавления!");
    }

    clickButtonAddToCart() {
        AllureReporter.addStep('Нажатие на кнопку "Купить"');
        const button = this.buttonAddToCart;
        button.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Купить" не доступна для клика или данный товар уже в корзине!'
        });
        button.click();
        button.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Купить" отображается после нажатия на нее!',
            reverse: true
        });
    }

    clickManufacturerLink() {
        AllureReporter.addStep('Нажатие на ссылку производителя');
        this.manufacturerLink.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Ссылка производителя в КТ недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.manufacturerLink);
    }

    clickActiveSubstanceLink() {
        AllureReporter.addStep('Нажатие на ссылку активного вещества');
        this.activeSubstanceLink.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Ссылка активного вещества в КТ недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.activeSubstanceLink);
    }

    clickAllFormsLink() {
        AllureReporter.addStep('Нажатие на ссылку всех форм выпуска');
        this.allFormsLink.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Ссылка всех форм выпуска в КТ недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.allFormsLink);
    }

    clickButtonAddToFavorites() {
        AllureReporter.addStep('Нажатие на кнопку "В избранное" в КТ');
        this.buttonAddToFavorites.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "В избранное" не отображается или недоступна для клика!'
        });
        this.buttonAddToFavorites.click();
    }

    checkSuccessfulSmsSendingMessage() {
        AllureReporter.addStep('Проверка сообщения об успешной подписке на СМС уведомления о наличии товара');
        this.successfulSmsSendingMessage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Сообщение об успешной подписке на СМС уведомление при появлении товара в наличии не отображается!'
        });
        const message = this.successfulSmsSendingMessage.getText();
        assert.equal(message, "Мы отправим SMS, когда товар появится в наличии", "Некорректный текст сообщения об успешной подписке на СМС уведомление при появлении товара в наличии");
    }

    inputPhoneNumberForSmsNotificationOnMobile() {
        AllureReporter.addStep('Ввод номера телефона для получения СМС уведомления о появлении товара в наличии');
        let phoneNumber = Math.floor(Math.random() * (Math.ceil(79000000000) - Math.floor(79999999999) + 1)) + Math.ceil(79000000000);
        this.mobileFieldPhoneNumber.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Поле ввода номера телефона для получения СМС уведомления о появлении товара в наличии не отображается!'
        });
        browser.execute(`arguments[0].value = "${phoneNumber}"`, this.mobileFieldPhoneNumber);
        this.mobileButtonPhoneNumberSubmit.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка подписки на СМС уведомление о появлении в наличии недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.mobileButtonPhoneNumberSubmit);
    }

    inputPhoneNumberForSmsNotification() {
        AllureReporter.addStep('Ввод номера телефона для получения СМС уведомления о появлении товара в наличии');
        let phoneNumber = Math.floor(Math.random() * (Math.ceil(79000000000) - Math.floor(79999999999) + 1)) + Math.ceil(79000000000);
        this.fieldPhoneNumber.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Поле ввода номера телефона для получения СМС уведомления о появлении товара в наличии не отображается!'
        });
        browser.execute(`arguments[0].value = "${phoneNumber}"`, this.fieldPhoneNumber);
        this.buttonPhoneNumberSubmit.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка подписки на СМС уведомление о появлении в наличии недоступна для клика!'
        });
        this.buttonPhoneNumberSubmit.click();
    }

    checkAvailabilityStatus() {
        AllureReporter.addStep('Проверка наличия товара');
        this.availabilityStatus.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Статус наличия товара не отображается!'
        });
        assert.equal(
            `${this.availabilityStatus.getText()}`,
            "В наличии",
            "Статус товара отличен от 'В наличии'!"
        );
    }

    checkGoodsTitle() {
        AllureReporter.addStep('Проверка заголовка товара');
        this.goodsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Наименование товара в заголовке КТ не отображается!'
        });
        return this.goodsTitle.getText().split(',')[0];
    }

    getGoodsName() {
        AllureReporter.addStep('Получение наименования товара');
        this.goodsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Наименование товара в КТ не отображается!'
        });
        return this.goodsTitle.getText();
    }

    checkBonuses() {
        AllureReporter.addStep('Проверка отображения бонусов');
        this.bonusCount.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Бонусы не отображаются!'
        });
        const bonuses = Number(this.bonusCount.getText().replace(/[^\d]/g, ''));
        assert.isAbove(
            bonuses,
            0,
            `Количество бонусов "${bonuses}" меньше или равно нулю!`
        );
        assert.equal(
            Number.isInteger(bonuses),
            true,
            `Количество бонусов "${bonuses}" не целое число!`
        );
        return bonuses;
    }

    checkBonusesBelowThreshold() {
        AllureReporter.addStep('Проверка отображения бонусов ниже порогового значения');
        const bonuses = this.checkBonuses();
        const threshold = userHelper.getUserInfo().bonus_program.bonus_threshold;
        assert.isBelow(
            bonuses,
            threshold,
            `Количество бонусов "${bonuses}" выше порогового значения "${threshold}"!`
        );
    }

    checkBonusesAboveThreshold() {
        AllureReporter.addStep('Проверка отображения бонусов выше порогового значения');
        const bonuses = this.checkBonuses();
        const threshold = userHelper.getUserInfo().bonus_program.bonus_threshold;
        assert.isAtLeast(
            bonuses,
            threshold,
            `Количество бонусов "${bonuses}" ниже порогового значения "${threshold}"!`
        );
    }

    addNumberItemsToCart(number) {
        AllureReporter.addStep('Указание количества товара для добавления товара в корзину');
        this.goodsCartCounter.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Наименование товара в заголовке КТ не отображается!'
        });
        browser.execute(`arguments[0].value = "${number}"`, this.goodsCartCounter);
        wdioExpect(this.goodsCartCounter).toHaveValue(
            `${number}`,
            {message: `Количество товара для добаления товара в корзину не изменилось на "${number}"!`}
        );
    }
}

module.exports = new GoodsPageProductDetail();
