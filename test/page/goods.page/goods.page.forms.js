const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPageForms {
    get formsBlock() {return $('//div[@id="bforms"]');}

    get navigationBarFormsTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="forms"]//a');}

    get formsTabCounter() {return this.navigationBarFormsTab.$('.//span');}

    get formsTitle() {return this.formsBlock.$('.//h2');}

    get goodsFormsCollection() {return this.formsBlock.$$('.//section[contains(@class, "listing-card")]');}

    assertFormsCounterValueWithActualCount() {
        AllureReporter.addStep('Проверка вкладки "Формы"');
        assert.equal(
            `${(this.goodsFormsCollection.length).toString()}`,
            `${this.formsTabCounter.getText()}`,
            "Количество форм выпуска не совпадает с счетчиком на вкладке форм выпуска!"
        );
    }

    checkFormsTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Формы"');
        this.formsTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок форм выпуска не отображается!'
        });
        assert.equal(
            `${(this.formsTitle.getText())}`,
            `Формы выпуска  ${this.formsTabCounter.getText()}`,
            "Некорректный заголовок форм выпуска!"
        );
    }

    clickNavigationBarFormsTab() {
        AllureReporter.addStep('Нажатие на вкладку "Формы выпуска"');
        this.navigationBarFormsTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Формы выпуска" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarFormsTab);
    }

}

module.exports = new GoodsPageForms();