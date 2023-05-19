const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class OrthopedicCatalogPage {
    get orthopedicCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkOrthopedicCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Ортопедические изделия"');
        this.orthopedicCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Ортопедические изделия" не отображается!'
        });
        const title = this.orthopedicCatalogTitle.getText();
        assert.equal(title, "Ортопедические изделия", "Некорректный заголовок раздела каталога 'Ортопедические изделия'!");
    }
}

module.exports = new OrthopedicCatalogPage();