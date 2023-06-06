const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');
const basePage = require('../base.page/base.page');

class GoodsPageAlsoBuy {
    get alsoBuyBlock() {return $('//section[contains(@class, "also")]');}

    get alsoBuyTitle() {return this.alsoBuyBlock.$('.//h2[contains(@class, "title")]');}

    get buttonBuyCollection() {return this.alsoBuyBlock.$$('.//a[@data-test-id="buttonBuy"]');}

    get buttonInCartCollection() {return this.alsoBuyBlock.$$('.//a[@data-test-id="buttonInCart"]');}

    get itemsCollection() {return this.alsoBuyBlock.$$('.//div[@data-test-id="productInCart"]');}

    get pricesCollection() {return this.alsoBuyBlock.$$('.//div[contains(@class, "price")]//span');}

    get itemTitlesCollection() {return this.alsoBuyBlock.$$('.//div[@data-test-id="productInCart"]//a[contains(@class, "title")]');}

    checkAlsoBuyWithProductTitle() {
        AllureReporter.addStep('Проверка блока "С этим товаром покупают"');
        this.alsoBuyBlock.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Блок "С этим товаром покупают" не отображается!'
        });
        this.alsoBuyTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок блока "С этим товаром покупают" не отображается!'
        });
        this.alsoBuyTitle.scrollIntoView();
        assert.equal(
            `${this.alsoBuyTitle.getText()}`,
            "С этим товаром покупают",
            "Некорректный заголовок блока С этим товаром покупают"
        );
    }

    checkAlsoBuyWithProductItemsCount() {
        AllureReporter.addStep('Проверка количества товаров в блоке "С этим товаром покупают"');
        wdioExpect(this.itemsCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Некорректное количество товаров в блоке С этим товаром покупают!'
        });
    }

    clickButtonBuyForAlsoBuyWithProductBlock() {
        AllureReporter.addStep('Нажатие на кнопку "Купить" случайного товара в блоке "С этим товаром покупают"');
        const buttonsBuy = this.buttonBuyCollection;
        const randBtn = buttonsBuy[Math.floor(Math.random()*buttonsBuy.length)];
        const index = buttonsBuy.indexOf(randBtn);
        randBtn.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Купить" в блоке "С этим товаром покупают" не отображается или недоступна для клика!'
        });
        randBtn.click();
        randBtn.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Купить" в блоке "С этим товаром покупают" отображается после клика!',
            reverse: true
        });
        return index;
    }

    getAlsoBuyWithProductPrice(index) {
        AllureReporter.addStep('Получение цены случайно выбранного ранее товара в блоке "С этим товаром покупают"');
        return this.pricesCollection[index].getAttribute("data-price");
    }

    checkPriceInCartAndGoodsPriceInBlockAlsoBuy(index) {
        AllureReporter.addStep('Проверка цены в корзине после добавления товара из блока "С этим товаром покупают"');
        assert.equal(
            `${(this.getAlsoBuyWithProductPrice(index)).split(' ').join('')}`,
            `${(basePage.cart.checkSumInGoodsCart()).split(' ').join('')}`,
            "Цена в карточке товара блока 'С этим товаром покупают' не совпадает с ценой в корзине!"
        );
    }

    getAlsoBuyWithProductName(index) {
        AllureReporter.addStep('Получение наименования первого товара в блоке "С этим товаром покупают"');
        return this.itemTitlesCollection[index].getText();
    }

    clickButtonInCart(index) {
        AllureReporter.addStep('Нажатие кнопки "В корзине" в блоке "С этим товаром покупают"');
        const btn = this.buttonInCartCollection[index];
        btn.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка В корзине недоступна для клика!'
        });
        assert.equal(
            `${btn.getText()}`,
            "В корзине",
            "Некорректный текст кнопки В корзине!"
        );
        btn.click();
    }
}

module.exports = new GoodsPageAlsoBuy();