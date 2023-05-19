const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai'), assert = chai.assert;
const goodsCardCore = require('./goods.page.product.detail');

class GoodsPageAnalogs {
    get promotedAnalogsBlock() {return $('//section[@class="analogs"]');}

    get promotedAnalogsCollection() {return this.promotedAnalogsBlock.$$('.//div[contains(@class, "slick-active")]//div[@data-test-id="productInCart"]');}

    get promotedAnalogTitlesCollection() {return this.promotedAnalogsBlock.$$('.//div[contains(@class, "slick-active")]//a[@data-ga-event="Analog"]');}

    get buttonNext() {return this.promotedAnalogsBlock.$('.//button[contains(@class, "next")]');}

    get buttonPrev() {return this.promotedAnalogsBlock.$('.//button[contains(@class, "prev")]');}

    get promotedAnalogsButtonsBuyCollection() {return this.promotedAnalogsBlock.$$('.//div[contains(@class, "slick-active")]//button[@data-test-id="buttonBuy"]');}

    get promotedAnalogsButtonsInCartCollection() {return this.promotedAnalogsBlock.$$('.//div[contains(@class, "slick-active")]//a[@data-test-id="buttonInCart"]');}

    get navigationBarAnalogsTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="analogs"]//a');}

    get analogsTabCounter() {return this.navigationBarAnalogsTab.$('.//span');}

    get analogsBlock() {return $('//section[@data-b="analogs"]');}

    get analogsTitle() {return this.analogsBlock.$('.//h2[contains(@class, "title")]');}

    get goodsAnalogsCollection() {return this.analogsBlock.$$('.//section[contains(@class, "d-flex align-items-start align-items-md-center cc-item")]');}

    get analogsTitleCollection() {return this.analogsBlock.$$('.//a[contains(@class, "listing-card__title-link")]');}

    checkDuplicatesInAnalogs() {
        const analogs = [...this.analogsTitleCollection];
        let titles = [];
        analogs.forEach(title => {
            let titleTxt = title.getText();
            titles.push(titleTxt);
        });
        let findDuplicates = titles.filter((item, index, arr) => arr.indexOf(item) !== index);
        assert.isBelow(
            findDuplicates.length,
            1,
            "В списке аналогов на КТ присутствуют дубликаты!"
        );
    }

    assertAnalogsCounterValueWithActualCount() {
        AllureReporter.addStep('Проверка вкладки "Аналоги"');
        assert.equal(
            (this.goodsAnalogsCollection.length).toString(),
            this.analogsTabCounter.getText(),
            "Количество аналогов не совпадает с счетчиком на вкладке аналогов!"
        );
    }

    checkAnalogsTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Аналоги"');
        this.analogsTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок аналогов не отображается!'
        });
        assert.equal(
            `${this.analogsTitle.getText()}`,
            `Аналоги ${goodsCardCore.goodsTitle.getText()}`,
            "Некорректный заголовок аналогов!"
        );
    }

    clickNavigationBarAnalogsTab() {
        AllureReporter.addStep('Нажатие на вкладку "Аналоги"');
        this.navigationBarAnalogsTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Аналоги" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarAnalogsTab);
    }

    addAnalogToCart() {
        AllureReporter.addStep('Добавление рекламного аналога в корзину');
        this.promotedAnalogsBlock.scrollIntoView(false);
        const analogs = this.promotedAnalogsCollection;
        const buttonsBuy = this.promotedAnalogsButtonsBuyCollection;
        const buttonsInCart = this.promotedAnalogsButtonsInCartCollection;
        const randAnalog = analogs[Math.floor(Math.random()*analogs.length)];
        const index = analogs.indexOf(randAnalog);
        const title = this.promotedAnalogTitlesCollection[index].getText();
        randAnalog.scrollIntoView(false);
        randAnalog.moveTo();
        buttonsBuy[index].waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка Купить недоступна для клика после наведения курсора на карточку рекламного аналога!'
        });
        buttonsBuy[index].click();
        buttonsInCart[index].waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка В корзине недоступна для клика после нажатия кнопки Купить на карточке рекламного аналога!'
        });
        buttonsInCart[index].click();
        return title;
    }

    checkScrollToNextAnalog() {
        AllureReporter.addStep('Проверка покрутки карусели рекламных аналогов на КТ к следующему товару');
        this.promotedAnalogsBlock.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Блок рекламных аналогов в КТ не отображается!'
        });
        this.promotedAnalogsBlock.scrollIntoView(false);
        const firstAnalogsSet = this.promotedAnalogTitlesCollection;
        const secondTitle = firstAnalogsSet[1].getText();
        this.buttonNext.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка прокрутки карусели к следующему рекламного аналогу не доступна для клика!'
        });
        this.buttonNext.click();
        this.buttonPrev.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка прокрутки карусели к предыдущему рекламного аналогу не доступна для клика после прокрутки вправо!'
        });
        const secondAnalogsSet = this.promotedAnalogTitlesCollection;
        const firstTitle = secondAnalogsSet[0].getText();
        assert.equal(
            firstTitle,
            secondTitle,
            "После прокрутки списка рекламных аналогов позиции не меняются!"
        );
    }

    checkScrollToPreviousAnalog() {
        AllureReporter.addStep('Проверка покрутки карусели рекламных аналогов на КТ к предыдущему товару');
        this.promotedAnalogsBlock.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Блок рекламных аналогов в КТ не отображается!'
        });
        this.promotedAnalogsBlock.scrollIntoView(false);
        const firstAnalogsSet = this.promotedAnalogTitlesCollection;
        const firstTitle = firstAnalogsSet[0].getText();
        this.buttonPrev.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка прокрутки карусели к предыдущему аналогу не доступна для клика!'
        });
        this.buttonPrev.click();
        this.buttonPrev.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка прокрутки карусели к предыдущему аналогу доступна для клика после возврата к изначальному состоянию карусели аналогов!',
            reverse: true
        });
        const secondAnalogsSet = this.promotedAnalogTitlesCollection;
        const secondTitle = secondAnalogsSet[1].getText();
        assert.equal(firstTitle, secondTitle, "После прокрутки списка аналогов позиции не меняются!");
    }
}

module.exports = new GoodsPageAnalogs();