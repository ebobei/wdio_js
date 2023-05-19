const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class MotherAndChildCatalogPage {
    get motherAndKidsCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkMotherAndKidsCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Средства для матери и ребенка"');
        this.motherAndKidsCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Средства для матери и ребенка" не отображается!'
        });
        const title = this.motherAndKidsCatalogTitle.getText();
        assert.equal(title, "Средства для матери и ребенка", "Некорректный заголовок раздела каталога 'Средства для матери и ребенка'!");
    }
}

module.exports = new MotherAndChildCatalogPage();