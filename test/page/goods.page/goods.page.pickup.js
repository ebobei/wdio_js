const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPagePickup {
    get pickupBlock() {return $('//div[contains(@class, "delivery-info")]');}

    get pickupStatusInMoscow() {return this.pickupBlock.$('.//div[contains(@class, "item-title") and .="В Москве"]/parent::div//a[@href="#bpickup"]/parent::*');}

    get pickupStatusInMKAD() {return this.pickupBlock.$('.//div[contains(@class, "item-title") and .="За МКАД"]/parent::div//a[@href="#bpickup"]/parent::*');}

    get navigationBarPickupTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="pickup"]//a');}

    get pickupTitle() {return $('//div[@id="bpickup"]//div[contains(@class, "title")]');}

    checkPickupTitle() {
        AllureReporter.addStep('Проверка заголовка самовывоза');
        this.pickupTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок самовывоза не отображается!'
        });
        assert.equal(
            `${this.pickupTitle.getText().slice(0, 31)}`,
            "Самовывоз в Москве и области из",
            "Некорректный заголовок самовывоза!"
        );
    }

    clickNavigationBarPickupTab() {
        AllureReporter.addStep('Нажатие на вкладку "Самовывоз"');
        this.navigationBarPickupTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Самовывоз" недоступна для клика!'
        });
        this.navigationBarPickupTab.scrollIntoView(false);
        this.navigationBarPickupTab.click();
    }

    checkPickUpStatusInMoscow() {
        AllureReporter.addStep('Проверка статуса самовывоза для лекарств в Москве');
        assert.include(
            `${this.pickupStatusInMoscow.getText()}`,
            "Забрать из аптеки",
            "В блоке самовывоза в Москве нет слова 'Забрать из аптеки'!"
        );
    }

    checkPickUpStatusInMKAD() {
        AllureReporter.addStep('Проверка статуса самовывоза для лекарств за МКАД');
        assert.include(
            `${this.pickupStatusInMKAD.getText()}`,
            "Забрать из аптеки",
            "В блоке самовывоза за МКАД нет слова 'Забрать из аптеки'!"
        );
    }


}

module.exports = new GoodsPagePickup();