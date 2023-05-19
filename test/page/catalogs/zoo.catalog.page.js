const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class ZooCatalogPage {
    get zooCatalogTitle() {return $('//div[@class="sec-categories row mb-4"]//h1');}

    checkZooCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Зоотовары"');
        browser.waitUntil(
            () => this.zooCatalogTitle.isDisplayed() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Заголовок каталога "Зоотовары" не отображается!'
            }
        );
        const title = this.zooCatalogTitle.getText();
        assert.equal(title, "Зоотовары", "Некорректный заголовок раздела каталога 'Зоотовары'!");
    }
}

module.exports = new ZooCatalogPage();