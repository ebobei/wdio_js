const { assert } = require('chai');
const { default: AllureReporter } = require('@wdio/allure-reporter');

class FastDelivery {

    get fastDeliveryBlock() {return $('//div[contains(@class, "fast-delivery__panel") and @data-role="panelInfo"]');}

    get fastDeliveryInputAnimation() {return this.fastDeliveryBlock.$('.//div[contains(@class, "welcome")]');}

    get fastDeliveryInput() {return this.fastDeliveryBlock.$('.//input[contains(@class, "fast-delivery__inputMain")]');}

    get fastDeliveryFlashIcon() {return this.fastDeliveryBlock.$('.//img[contains(@src, "flash.svg") and @class="fast-delivery__titleIcon"]');}

    get fastDeliveryPopup() {return $('//div[@id="address-from"]//div[contains(@class, "fast-delivery__modalContent")]');}

    get fastDeliveryPopupContainerInput() {return this.fastDeliveryPopup.$('.//div[@data-role="containerInput"]');}

    get fastDeliveryPopupInput() {return this.fastDeliveryPopupContainerInput.$('.//input[@name="ADDRESS"]');}

    get fastDeliveryLandingLink() {return this.fastDeliveryPopup.$('.//a[contains(@href, "/landing/fast_delivery/")]');}

    get fastDeliveryAddressItemCollection() {return this.fastDeliveryPopup.$$('.//div[@class="fast-delivery__addressItem"]');}

    get fastDeliveryAddressSuggestionsCollection() {return this.fastDeliveryPopup.$$('.//div[@class="suggestions-suggestion"]');}

    get fastDeliveryPopupClose() {return this.fastDeliveryPopup.$('.//button[@aria-label="Close"]');}

    get fastDeliveryPopupStartImg() {return this.fastDeliveryPopup.$('.//img[contains(@src, "fast-delivery-start.png")]');}

    get fastDeliveryPopupButtonGoToBuy() {return this.fastDeliveryPopup.$('.//button[contains(text(), "К покупкам")]');}

    checkFastDeliveryInput() {
        AllureReporter.addStep('Проверка отображения поля ввода адреса быстрой доставки');
        wdioExpect(this.fastDeliveryInput).toBeDisplayed({
            message: 'Поле ввода адреса быстрой доставки не отображается!'
        });
        wdioExpect(this.fastDeliveryBlock).toHaveTextContaining(
            'Укажите адрес',
            {message: '"Укажите адрес" не отображается в поле ввода адреса быстрой доставки!'}
        );
    }

    checkFastDeliveryBlock() {
        AllureReporter.addStep('Проверка отображения блока быстрой доставки на главной странице');
        wdioExpect(this.fastDeliveryBlock).toHaveTextContaining(
            'Быстрая доставка️',
            {message: '"Быстрая доставка️" не отображается рядом с полем ввода адреса быстрой доставки!'}
        );
        wdioExpect(this.fastDeliveryFlashIcon).toBeDisplayed({
            message: 'Значок молнии не отображается рядом с полем ввода адреса быстрой доставки!'
        });
        wdioExpect(this.fastDeliveryInputAnimation).toBeDisplayed({
            message: 'Не отображается анимация перелива градиента!'
        });
        const animation = this.fastDeliveryInputAnimation.getCSSProperty('animation-duration');
        assert.equal(
            `${animation.value}`,
            "5s",
            "Перерыв между анимацией перелива градиента не равен 5 сек!"
        );
    }

    clickFastDeliveryPopup() {
        AllureReporter.addStep('Первое нажатие на поле ввода адреса быстрой доставки и проверка попапа-онбординга');
        this.fastDeliveryInput.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Поле ввода адреса быстрой доставки не доступно!',
        });
        browser.pause(3000);
        this.fastDeliveryInput.click();
        wdioExpect(this.fastDeliveryPopup).toBeDisplayed({
            message: 'Попап-онбординг быстрой доставки не отображается!'
        });
        wdioExpect(this.fastDeliveryPopupInput).toBeDisplayed({
            message: 'Поле ввода адреса в попапе-онбординге быстрой доставки не отображается!'
        });
        wdioExpect(this.fastDeliveryPopupInput).toBeEnabled({
            message: 'Поле ввода адреса в попапе-онбординге быстрой доставки не включено!'
        });
        wdioExpect(this.fastDeliveryPopup).toHaveTextContaining(
            'Вычислим время ближайшей доставки',
            {message: '"Вычислим время ближайшей доставки" не отображается в попапе-онбординге быстрой доставки!'}
        );
        wdioExpect(this.fastDeliveryLandingLink).toBeClickable({
            message: 'Кнопка "Подробнее о Быстрой Доставке" (ведет на лендинг) не кликабельна!'
        });
        wdioExpect(this.fastDeliveryPopupStartImg).toBeDisplayed({
            message: 'Изображение молнии не отображается!'
        });
    }

    clickFastDeliveryPopupInput() {
        AllureReporter.addStep('Нажатие на поле ввода адреса быстрой доставки в попапе-онбординге');
        this.fastDeliveryPopupInput.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Поле ввода адреса быстрой доставки в попапе-онбординге не отображается!'
        });
        this.fastDeliveryPopupInput.click();
        wdioExpect(this.fastDeliveryAddressItemCollection).toBeElementsArrayOfSize({
            gte: 0,
            message: 'Не отображаются сохраненные адреса!'
        });
    }

    fillAddressFastDeliveryPopup(address) {
        AllureReporter.addStep('Ввод адреса в поле ввода адреса быстрой доставки в попапе-онбординге');
        this.fastDeliveryPopupInput.setValue(address);
        wdioExpect(this.fastDeliveryAddressSuggestionsCollection).toBeElementsArrayOfSize({
            gte: 0,
            message: 'Не отображаются предлагаемые адреса!'
        });
    }

    clickFastDeliveryAddressSuggestion() {
        AllureReporter.addStep('Нажатие на первый предложенный адрес в поле ввода адреса быстрой доставки в попапе-онбординге');
        const text = this.fastDeliveryAddressSuggestionsCollection[0].getText();
        this.fastDeliveryAddressSuggestionsCollection[0].click();
        wdioExpect(this.fastDeliveryPopupContainerInput).toHaveAttributeContaining(
            'class',
            'is-loading',
            {message: 'Лоадер не отображается!'}
        );
        assert.include(
            `${this.fastDeliveryPopup.getText()}`,
            "Проверяем доступность быстрой доставки",
            '"Проверяем доступность быстрой доставки" не отображается в попапе-онбординге быстрой доставки!'
        );
        browser.waitUntil(
            () => this.fastDeliveryPopupContainerInput.getAttribute('class') !== 'fast-delivery__input active valid is-loading',
            {
                timeout: 5000,
                timeoutMsg: 'Слишком долгая загрузка введенного адреса быстрой доставки в попапе-онбординге!'
            }
        );
        wdioExpect(this.fastDeliveryPopupInput).toHaveValueContaining(
            `${text}`,
            {message: 'Введенный адрес не указан в поле адреса быстрой доставки в попапе-онбординге!'}
        );
        assert.notInclude(
            `${this.fastDeliveryPopup.getText()}`,
            "Проверяем доступность быстрой доставки",
            '"Проверяем доступность быстрой доставки" отображается в попапе-онбординге быстрой доставки!'
        );
        wdioExpect(this.fastDeliveryPopup).toHaveTextContaining(
            'Доставим заказ сегодня до',
            {message: 'Для введенного адреса не доступна быстаря доставка!'}
        );
    }

    closeFastDeliveryPopup() {
        AllureReporter.addStep('Закрытие в попапа-онбординга быстрой доставки');
        this.fastDeliveryPopupClose.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка закрытия попапа-онбординга быстрой доставки не доступна для клика!',
        });
        this.fastDeliveryPopupClose.click();
        this.fastDeliveryPopup.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Попап-онбординг быстрой доставки отображается после закрытия!',
            reverse: true
        });
    }

    clickGoToBuyInFastDeliveryPopup() {
        AllureReporter.addStep('Нажатие на кнопку "К покупкам" в попапе-онбординге быстрой доставки');
        this.fastDeliveryPopupButtonGoToBuy.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "К покупкам" в попапе-онбординге быстрой доставки не доступна для клика!',
        });
        this.fastDeliveryPopupButtonGoToBuy.click();
        this.fastDeliveryPopup.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Попап-онбординг быстрой доставки отображается после нажатия на кнопку "К покупкам"!',
            reverse: true
        });
    }

    clickFastDeliveryNoPopup() {
        AllureReporter.addStep('Нажатие на поле ввода адреса быстрой доставки после указания адреса в попапе-онбординге');
        this.fastDeliveryInput.clearValue();
        this.fastDeliveryInput.click();
        assert.equal(
            `${this.fastDeliveryPopup.isDisplayed()}`,
            'false',
            "Попап-онбординг быстрой доставки отображается!"
        );
    }
}

module.exports = new FastDelivery();