const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class HygieneCatalogPage {
    get hygieneCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkHygieneCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Гигиена"');
        this.hygieneCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Гигиена" не отображается!'
        });
        const title = this.hygieneCatalogTitle.getText();
        assert.equal(title, "Гигиена", "Некорректный заголовок раздела каталога 'Гигиена'!");
    }
}

module.exports = new HygieneCatalogPage();