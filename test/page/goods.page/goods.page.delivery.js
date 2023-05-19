const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class GoodsPageDelivery {
    get deliveryStatusInMoscow() {return $('//*[@id="catalog-delivery-courier"]');}

    get deliveryStatusInMKAD() {return $('//*[@id="catalog-delivery-courier"]/div[2]/table[2]/thead/tr/th[1]');}

    get navigationBarDeliveryTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="delivery"]//a');}

    get deliveryTitle() {return $('//div[@data-b="delivery"]//div[@class="h2"]');}

    checkDeliveryTitle() {
        AllureReporter.addStep('Проверка заголовка доставки');
        this.deliveryTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок доставки не отображается!'
        });
        assert.equal(
            `${this.deliveryTitle.getText()}`,
            "Доставка и самовывоз в Москве и области",
            "Некорректный заголовок доставки!"
        );
    }

    clickNavigationBarDeliveryTab() {
        AllureReporter.addStep('Нажатие на вкладку "Доставка"');
        this.navigationBarDeliveryTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Доставка" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarDeliveryTab);
    }

    checkDeliveryStatusInMoscow() {
        AllureReporter.addStep('Проверка статуса доставки для лекарств в Москве');
        assert.include(
            `${this.deliveryStatusInMoscow.getText()}`,
            "Доставка",
            "В блоке доставки в Москве нет слова 'Доставка'!"
        );
    }

    checkDeliveryStatusInMKAD() {
        AllureReporter.addStep('Проверка статуса доставки для лекарств за МКАД');
        assert.include(
            `${this.deliveryStatusInMKAD.getText()}`,
            "Доставка",
            "В блоке доставки за МКАД нет слова 'Доставка'!"
        );
    }
}

module.exports = new GoodsPageDelivery();