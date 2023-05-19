const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class MedicalCatalogPage {
    get medicalCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    checkMedicalCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Медицинские товары"');
        this.medicalCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Медицинские товары" не отображается!'
        });
        const title = this.medicalCatalogTitle.getText();
        assert.equal(title, "Медтовары", "Некорректный заголовок раздела каталога 'Медицинские товары'!");
    }
}

module.exports = new MedicalCatalogPage();