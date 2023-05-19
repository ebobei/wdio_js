const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert
    , expect = chai.expect
    , should = chai.should();

class BaseCatalogPage {
    get catalogTitle() {return $('//section[contains(@class, "sec-inner")]//h1');}

    checkCatalogTitle() {
        AllureReporter.addStep('Проверка отображения заголовка каталога товаров');
        this.catalogTitle.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Заголовок каталога товаров не отображается!'
        });
        return this.catalogTitle.getText();
    }
}

module.exports = new BaseCatalogPage();