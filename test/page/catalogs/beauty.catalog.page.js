const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class BeautyCatalogPage {
    get beautyCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkBeautyCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Красота"');
        this.beautyCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Красота" не отображается!'
        });
        const title = this.beautyCatalogTitle.getText();
        assert.equal(title, "Красота", "Некорректный заголовок раздела каталога 'Красота'!");
    }
}

module.exports = new BeautyCatalogPage();