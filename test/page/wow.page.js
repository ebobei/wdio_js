const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class WowPage {
    get wowSaleTitle() {return $('//h1[@class="sec-inner__title"]');}

    get breadcrumbsCollection() {return $$('//div[@class="breadcrumbs  mb-20"]//li');}

    get productsCollection() {return $$('//*[@class="wow-item"]');}

    get wowProgressCounter() {return $('//*[@class="col col-auto wow-progress wow-countdown-counter"]');}

    checkProductsListAtWowSale() {
        AllureReporter.addStep('Проверка отображение карточек товара в разделе "Wow-скидки"');
        const products = this.productsCollection;
        let len = products.length;
        assert.isAtLeast(len, 1, "В разделе Wow-скидки не находится ни одного товара");
    }

    checkLastBreadcrumb() {
        AllureReporter.addStep('Проверка хлебных крошек в разделе "Wow-скидки"');
        const crumbs = this.breadcrumbsCollection;
        let len = crumbs.length;
        let lastCrumb = crumbs[len - 1];
        browser.waitUntil(
            () => lastCrumb.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Хлебные крошки не отображаются!'
            }
        );
        let crumbTxt = lastCrumb.getText();
        assert.equal(crumbTxt, "Wow-скидки", "Последняя хлебная крошка имеет некорректный текст!");

    }
    checkWowSaleTitle() {
        AllureReporter.addStep('Проверка заголовка в разделе Wow-скидки');
        browser.waitUntil(
            () => this.wowSaleTitle.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Заголовок раздела Wow-скидки не отображается!'
            }
        );
        const title = this.wowSaleTitle.getText();
        assert.equal(title, "Скидки и акции в аптеке", "Некорректный текст заголовка в разделе Wow-скидки");
    }

    checkWowProgressCounter() {
        AllureReporter.addStep('Проверка счетчика времени действия акции Wow-скидки');
        browser.waitUntil(
            () => this.wowProgressCounter.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Счетчик времени действия акции Wow-скидки не отображается!'
            }
        );
    }

}

module.exports = new WowPage();