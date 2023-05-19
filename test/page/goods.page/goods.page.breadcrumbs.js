const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPageBreadcrumbs {
    get breadcrumbs() {return $('//div[contains(@class, "breadcrumbs")]');}

    get breadcrumbsSlashCollection() {return this.breadcrumbs.$$('.//li[contains(., "/")]');}

    checkBreadcrumbs() {
        AllureReporter.addStep('Проверка отображения хлебных крошек');
        this.breadcrumbs.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Хлебные крошки не отображаются!!'
        });
    }

    checkBreadcrumbsCount() {
        AllureReporter.addStep('Проверка количества хлебных крошек');
        const count = this.breadcrumbsSlashCollection.length;
        assert.isAtLeast(
            count,
            4,
            "Неверное количество разделов в хлебных крошках!"
        );
    }
}

module.exports = new GoodsPageBreadcrumbs();