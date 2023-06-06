const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');
const basePage = require('../base.page/base.page');

class GoodsPageBundle {
    get bundleItemsCollection() {return $$('//div[@class="sec-item-alt__buy-with-item"]');}

    get bundleItemsNamesCollection() {return $$('//div[@class="sec-item-alt__buy-with-item"]//a[@data-ga-action="Item_bundle"]');}

    get buttonAddBundleToCart() {return $('//a[@data-action="addBundleToCart"]');}

    get pricesOfBundleCollection() {return $$('//div[@class="card__price-current small"]//span');}

    get bundleTitle() {return $('//div[@data-neon-attr="data-bundle"]//h2');}

    get buttonBundleInCart() {return $('//a[@class="btn btn-in-cart btn-sm in-cart hidden"]');}

    get priceOfBundle() {return $('//div[@class="price mb-10"]//i');}

    checkCountOfBundleItems() {
        AllureReporter.addStep('Проверка количества товаров в БАНДЛ+');
        wdioExpect(this.bundleItemsCollection).toBeElementsArrayOfSize({
            eq: 2,
            message: "Количество элементов БАНДЛ+ не равно двум!"
        });
        return this.bundleItemsCollection.length;
    }

    clickButtonAddBundleToCart() {
        AllureReporter.addStep('Нажатие на кнопку "Купить" в блоке БАНДЛ+');
        this.buttonAddBundleToCart.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Купить в блоке Бандл+ недоступна для клика!'
        });
        this.buttonAddBundleToCart.click();
        this.buttonAddBundleToCart.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Купить в блоке Бандл+ отображается после нажатия на нее!',
            reverse: true
        });
    }

    checkCountOfBundleItemsAndItemsInCart() {
        AllureReporter.addStep('Проверка числа в счетчике корзины после добавления БАНДЛ+');
        const actualCount = this.bundleItemsCollection.length;
        basePage.cart.checkCountInCart(actualCount);
    }

    getPricesOfBundleCollection() {
        AllureReporter.addStep('Получение коллекции цен товаров в БАНДЛ+');
        let prices = [...this.pricesOfBundleCollection];
        return prices.map(price => price.getText());
    }

    checkBundleTitle() {
        AllureReporter.addStep('Проверка заголовка БАНДЛ+');
        this.bundleTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок Комплексное решение не отображается!'
        });
        assert.equal(
            `${this.bundleTitle.getText()}`,
            "Комплексное решение",
            "Некорректный заголовок блока Комплексное решение!"
        );
    }

    clickButtonBundleInCart() {
        AllureReporter.addStep('Нажатие на кнопку "В корзине" в блоке БАНДЛ+');
        this.buttonBundleInCart.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "В корзине" в блоке БАНДЛ+ недоступна для клика!'
        });
        this.buttonBundleInCart.click();
    }

    checkPriceOfBundle() {
        AllureReporter.addStep('Проверка суммарной стоимости товаров в блоке БАНДЛ+');
        this.priceOfBundle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Цена БАНДЛ+ не отображается!'
        });
        const actualSum = this.priceOfBundle.getText();
        const prices = this.pricesOfBundleCollection;
        const priceText = prices.map(price => price.getText());
        const expectedSum = priceText.reduce((accumulator, currentValue) => +accumulator + +currentValue);
        assert.equal(
            `${actualSum}`,
            `${expectedSum}`,
            "Сумма цен товаров БАНДЛ+ и отобржаемая сумма не совпадают! Ошибка в расчете!"
        );
    }

    checkPriceOfBundleAndPriceInCart() {
        AllureReporter.addStep('Проверка суммы в корзине после добавления в нее БАНДЛ+');
        const sumInCart = basePage.cart.checkSumInGoodsCart();
        const expectedSum = this.priceOfBundle.getText();
        assert.equal(
            `${sumInCart.split(' ').join('')}`,
            `${expectedSum.split(' ').join('')}`,
            "Цена бандла и цена в корзине после добавления бандла отличаются!"
        );
    }

    getNamesCollectionOfBundleItems() {
        AllureReporter.addStep('Получение коллекции наименований товаров в блоке БАНДЛ+');
        let names = [...this.bundleItemsNamesCollection];
        return names.map(name => name.getAttribute("data-ga-label"));
    }
}

module.exports = new GoodsPageBundle();