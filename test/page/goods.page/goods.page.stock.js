const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPageStock {
    get stockBanner() {return $('//a[contains(@class, "banners__item d-block") and contains(@href, "/company/stock/")]');}

    get stockTitle() {return $('//div[@class="promo--title h1"]');}

    get buttonAllStock() {return $('//a[@class="promo--all" and @href="/company/stock/"]');}

    checkStockTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Акции"');
        this.stockTitle.waitForDisplayed({
            timeout: 4000,
            timeoutMsg: 'Заголовок раздела "Акции" на КТ не отображается!'
        });
        assert.equal(
            `${this.stockTitle.getText()}`,
            "Акции",
            "Некорректный заголовок раздела Акции!"
        );
    }

    clickStockBanner() {
        AllureReporter.addStep('Нажатие на баннер акций');
        this.stockBanner.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Баннер скидок на КТ не доступен для клика!'
        });
        this.stockBanner.scrollIntoView(false);
        this.stockBanner.click();
    }

    clickButtonAllStock() {
        AllureReporter.addStep('Нажатие на кнопку "Все акции"');
        this.buttonAllStock.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Все акции" не доступна для клика!'
        });
        this.buttonAllStock.click();
    }
}

module.exports = new GoodsPageStock();