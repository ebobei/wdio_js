const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class BrandsPage {
    get brandsTitle() {return $('//h1[contains(., "бренд")]');}

    get brandCategoriesCollection() {return $$('//h2[contains(., "")]');}

    get paginationButtonCollection() {return $$('//*[contains(@class, "custom-pagination__item")]');}

    get activePaginationButton() {return $('custom-pagination__item custom-pagination__item--active');}

    get loader() {return $('//div[@class="waitwindowlocalshadow"]');}

    get brandSearchResultsTitle() {return $('//*[@class="sec-categories row mb-4"]/div/h1');}

    get brandLinkCollection() {return $$('//div[@class="listing-card__info"]//a[contains(@href, "/goods/brand/")]');}

    get manufacturerLinkCollection() {return $$('//div[@class="listing-card__info"]//a[contains(@href, "/goods/manufacturer/")]');}

    get activeSubstanceLinkCollection() {return $$('//div[@class="listing-card__info"]//a[contains(@href , "/goods/active_ingredient/")]');}
    
    get buttonAnalogCollection() {return $$('//p[@data-ga-event="Analog"]');}

    get titleOfProductWithAnalogsCollection() {return $$('//p[@data-ga-event="Analog"]/parent::div[@class="listing-card__info"]//a[@class="listing-card__title-link"]');}

    get mobileTitleOfProductWithAnalogsCollection() {return $$('//p[@data-ga-event="Analog"]/parent::div[@class="listing-card__info"]/parent::div/parent::section//a[@class="listing-card__title-link"]');}

    getBrandTitle() {
        AllureReporter.addStep('Получение заголовка в категории "Бренд"');
        this.brandSearchResultsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела поиска по производителю не отображается!'
        });
        const headerText = (this.brandSearchResultsTitle).getText();
        return headerText.substr(headerText.indexOf(" ") + 1);
    }

    clickMobileButtonAnalog() {
        AllureReporter.addStep('Нажатие на кнопку "Аналог от _"');
        const buttons = this.buttonAnalogCollection;
        const len = buttons.length;
        let randomButtonAnalog = buttons[Math.floor(Math.random()*len)];
        let indexBtn = buttons.indexOf(randomButtonAnalog);
        let titles = this.mobileTitleOfProductWithAnalogsCollection;
        let randTitle = titles[indexBtn];
        let titleTxt = randTitle.getText();

        browser.waitUntil(
            () => randomButtonAnalog.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Кнопка "Аналог от _" недоступна для клика!'
            }
        );
        const analogsButtonText = randomButtonAnalog.getText();
        const analogsCount = analogsButtonText.substr(0,analogsButtonText.indexOf(" "));
        browser.execute("arguments[0].click();", randomButtonAnalog);
        return [analogsCount, titleTxt];
    }

    clickButtonAnalog() {
        AllureReporter.addStep('Нажатие на кнопку "Аналог от _"');
        wdioExpect(this.buttonAnalogCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Нет товаров с кнопкой "Аналог от _"!',
            wait: 5000
        });
        const buttons = this.buttonAnalogCollection;
        const len = buttons.length;
        let randomButtonAnalog = buttons[Math.floor(Math.random()*len)];
        let indexBtn = buttons.indexOf(randomButtonAnalog);
        let titles = this.titleOfProductWithAnalogsCollection;
        let randTitle = titles[indexBtn];
        let titleTxt = randTitle.getText();

        browser.waitUntil(
            () => randomButtonAnalog.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Кнопка "Аналог от _" недоступна для клика!'
            }
        );
        const analogsButtonText = randomButtonAnalog.getText();
        const analogsCount = analogsButtonText.substr(0,analogsButtonText.indexOf(" "));
        browser.execute("arguments[0].click();", randomButtonAnalog);
        return [analogsCount, titleTxt];
    }

    clickActiveSubstanceLink() {
        AllureReporter.addStep('Нажатие на ссылку активного вещества');
        const links = this.activeSubstanceLinkCollection;
        const len = links.length;

        let randomLink = links[Math.floor(Math.random()*len)];

        browser.waitUntil(
            () => randomLink.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Ссылка активного вещества недоступна для клика!'
            }
        );
        const activeSubstanceName = randomLink.getText();
        browser.execute("arguments[0].click();", randomLink);
        return activeSubstanceName;
    }

    //TODO: сделать manufacturer с большой буквы
    clickmanufacturerLink() {
        AllureReporter.addStep('Нажатие на ссылку производителя');
        const links = this.manufacturerLinkCollection;
        const len = links.length;

        let randomLink = links[Math.floor(Math.random()*len)];

        browser.waitUntil(
            () => randomLink.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Ссылка производителя недоступна для клика!'
            }
        );
        const manufacturerName = randomLink.getText();
        browser.execute("arguments[0].click();", randomLink);
        return manufacturerName;
    }

    clickBrandLink() {
        AllureReporter.addStep('Нажатие на ссылку бренда');
        const links = this.brandLinkCollection;
        const len = links.length;

        let randomLink = links[Math.floor(Math.random()*len)];

        browser.waitUntil(
            () => randomLink.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Ссылка бренда недоступна для клика!'
            }
        );
        browser.execute("arguments[0].click();", randomLink);
    }

    checkBrandSearchResultsTitle() {
        AllureReporter.addStep('Проверка заголовка страницы берндов после перехода к товарам конкретного бренда');
        this.brandSearchResultsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок после перехода к списку товаров конкретного бренда не отображается!'
        });
    }

    waitUntilLoaderNotDisplayed() {
        AllureReporter.addStep('Ожидание лоадера');
        browser.waitUntil(
            () => this.loader.isDisplayed() === false,
            {
                timeout: 5000,
                timeoutMsg: 'Слишком долгая загрузка'
            }
        );
    }

    checkBrandsTitle() {
        AllureReporter.addStep('Проверка заголовка раздела Бренды');
        this.brandsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Бренды" не отображается!'
        });
        assert.equal(
            this.brandsTitle.getText(),
            "Косметика, лекарства и медицинские товары популярных брендов", "Заголовок раздела Бренды - некорректный!"
        );
    }

    checkCategoriesOnFirstPage() {
        AllureReporter.addStep('Проверка разделов на первой странице категорий брендов');
        let firstCategoriesCollection = [...this.brandCategoriesCollection];
        const texts = firstCategoriesCollection.slice(0,4).map(cat => cat.getText());
        assert.sameMembers(
            texts,
            ["1-9", "A"],
            "На первой странице не хватает категорий или их заголовки некорректные!"
        );
    }

    clickLastPaginationButton() {
        AllureReporter.addStep('Нажатие на последнюю кнопку пагинации в разделе брендов');
        let buttons = this.paginationButtonCollection;
        let len = buttons.length;
        let lastButton = buttons[len - 1];
        let lastButtonValue = lastButton.getText();
        lastButton.waitForClickable({timeout: 10000, timeoutMsg: 'Последняя кнопка пагинации на странице категорий брендов не отображается или недоступна для клика!'});
        browser.execute("arguments[0].click();", lastButton);
        this.waitUntilLoaderNotDisplayed();
        browser.pause(5000);

        lastButton.waitUntil(function() {
            let activeButtonValue = $('//span[@class ="custom-pagination__item custom-pagination__item--active"]').getText();
            return lastButtonValue === activeButtonValue;
        }, {
            timeout: 10000,
            timeoutMsg: 'Последняя кнопка в пагинации не стала активной после клика!'
        });
    }

    checkCategoriesOnLastPage() {
        AllureReporter.addStep('Проверка разделов на последней странице категорий брендов');
        let lastCategoriesCollection = [...this.brandCategoriesCollection];
        const texts = lastCategoriesCollection.slice().map(cat => cat.getText());
        assert.includeMembers(
            texts,
            ["Я"],
            "Последняя категория брендов не заканчивается на 'Я'"
        );
    }

    checkBrandTitleText(text) {
        AllureReporter.addStep('Проверка корректности заголовка страницы бернда');
        wdioExpect(this.brandSearchResultsTitle).toHaveTextContaining(
            `${text}`,
            {message: `Заголовок на странице бренда не содержит "${text}"`}
        );
    }
}

module.exports = new BrandsPage();