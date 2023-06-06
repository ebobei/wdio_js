const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class CartPage {
    get cart() {return $('//a[@data-action="toCart"]');}

    get countInCart() {return this.cart.$('.//span[@class="badge"]');}

    //TODO: скорее get
    checkSumInGoodsCart() {
        AllureReporter.addStep('Проверка суммы товаров в корзине');
        this.cart.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Корзина с счетчиком товаров не отображается!'
        });
        return this.cart.getAttribute("data-price");
    }

    checkCountInCart(count) {
        AllureReporter.addStep('Проверка количества товаров в счетчике корзины');
        this.cart.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Корзина с счетчиком товаров не отображается!'
        });
        assert.equal(
            `${count}`,
            `${parseInt(this.countInCart.getText())}`,
            'Количество товаров в корзине не соответствует количеству добавленных в нее товаров!'
        );
    }
}

module.exports = new CartPage();