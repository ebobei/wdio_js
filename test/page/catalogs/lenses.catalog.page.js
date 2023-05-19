const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class LensesCatalogPage {
    get lensesCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkLensesCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Линзы"');
        this.lensesCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Линзы" не отображается!'
        });
        const title = this.lensesCatalogTitle.getText();
        assert.equal(title, "Линзы", "Некорректный заголовок раздела каталога 'Линзы'!");
    }
}

module.exports = new LensesCatalogPage();