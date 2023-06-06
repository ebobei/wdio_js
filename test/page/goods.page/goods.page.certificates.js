const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;
const goodsPageProductDetails = require('../../page/goods.page/goods.page.product.detail');

class GoodsPageCertificates{
    get certificatesTitle() {return $('//h4[@class="sec-item__certificates-title mb-15"]');}

    get certificatesTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="certificates"]//a');}

    get goodsCertificatesCollection() {return $$('.sec-item__certificates-slider .slick-slide:not(.slick-cloned)');}

    get certificatesTabCounter() {return this.certificatesTab.$('.//span');}

    assertCertificatesCounterValueWithActualCount() {
        AllureReporter.addStep('Проверка вкладки "Сертификаты"');
        assert.equal(
            `${(this.goodsCertificatesCollection.length).toString()}`,
            `${this.certificatesTabCounter.getText()}`,
            "Количество сертификатов не совпадает с счетчиком на вкладке сертификатов!"
        );
    }

    clickCertificatesTab() {
        AllureReporter.addStep('Нажатие на вкладку "Сертификаты" в КТ');
        this.certificatesTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Сертификаты" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.certificatesTab);
    }

    checkCertificatesTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Сертификаты" в КТ');
        this.certificatesTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок сертификатов не отображается!'
        });
        assert.equal(
            `${this.certificatesTitle.getText()}`,
            `Сертификаты ${goodsPageProductDetails.goodsTitle.getText()}`,
            "Некорректный заголовок сертификатов!"
        );
    }
}

module.exports = new GoodsPageCertificates();