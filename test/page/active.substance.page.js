const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class ActiveSubstancePage {
    get activeSubstanceHeader() {return $('//h1[contains(text(), "Препараты и лекарства, содержащие")]');}

    get activeSubstanceLinkCollection() {return $$('//*[@class="listing-card__info"]//*[contains(@href , "/goods/active_ingredient/")]');}

    get goodsPriceCollection() {return $$('//section[contains(@class, "listing-card")]//span[@class="listing-card__price-new"]');}

    get buttonsAnalogCollection() {return $$('//div[@class="listing-card__info"]//p[@data-ga-event="Analog"]');}

    get productsCollection() {return $$('//section[contains(@class, "listing-card")]');}

    get titlesCollection() {return $$('//a[@class="listing-card__title-link"]');}

    getTitle() {
        const titles = [...this.titlesCollection];
        let titleList = [];
        titles.forEach(title => {
            let titleTxt = title.getText();
            titleList.push(titleTxt);
            return titleList;
        });
        return titleList;
    }

    getTextFromFirstAnalog() {
        AllureReporter.addStep('Получение текста из кнопки "N аналогов от P руб."');
        const buttons = this.buttonsAnalogCollection;

        let firstButtonAnalog = buttons[0];
        const firstButtonAnalogText = firstButtonAnalog.getText();

        return firstButtonAnalogText;
    }

    getFirstPriceOfSearchResultsList() {
        AllureReporter.addStep('Получение цены первого товара');
        const prices = this.goodsPriceCollection;
        const firstPrice = prices[0];

        return firstPrice;
    }

    checkTextFromFirstAnalogButtonContainsFirstPrice() {
        AllureReporter.addStep('Сравнение цены в кнопке "N аналогов от _ руб" и первой цены после перехода в раздел аналогов');
        assert.include(this.getTextFromFirstAnalog, this.getFirstPriceOfSearchResultsList, "Первая кнопка 'N аналогов от P руб.' не содержит наименьшую цену!");
    }

    getCountOfProducts() {
        AllureReporter.addStep('Получение количества товаров в списке');
        const count = (this.productsCollection).length;
        return count;
    }

    getCountOfAnalogsFromButton() {
        AllureReporter.addStep('Получение числа аналогов из кноки "N аналогов от _ руб"');
        const buttons = this.buttonsAnalogCollection;
        const len = buttons.length;

        let randomButton = buttons[Math.floor(Math.random()*len)];
        const buttonText = randomButton.getText();

        const countInButton = buttonText.split(' ')[0];
        return countInButton;
    }

    checkPricesOfElementsSortedByAsc() {
        AllureReporter.addStep('Проверка корректности сортировки аналогов по возрастанию цены');
        const prices = [...this.goodsPriceCollection];
        let actualPrices = [];
        let expectedPrices = [];

        function sortByAsc(a, b) {
            return a - b;
        }

        prices.forEach(price => {
            let text = price.getText();
            text = text.replace(/[^+\d]/g, '');
            actualPrices.push(text);  
        });

        prices.forEach(price => {
            let text = price.getText();
            text = text.replace(/[^+\d]/g, '');
            expectedPrices.push(text);
            expectedPrices.sort(sortByAsc);
        });

        assert.sameOrderedMembers(actualPrices, expectedPrices, "Список аналогов не отсортирован по возрастанию цены!");
    }

    compareActiveSubstanceWithTitle() {
        AllureReporter.addStep('Проверка соответствия активного вещества в заголовке категории и наименования активного вещества в карточке товара на странице активного вещества');
        browser.waitUntil(
            () => this.activeSubstanceHeader.isDisplayed() === true,
            {
                timeout: 10000,
                timeoutMsg: 'Заголовок "Препараты и лекарства, содержащие + действующее вещество" не отображается!'
            }
        );
        const headerText = (this.activeSubstanceHeader).getText();
        let activeSubstanceFromHeader = headerText.substr(headerText.indexOf(" ") + 25);

        let links = this.activeSubstanceLinkCollection;
        let len = links.length;

        //FIXME: Сделать массив ссылок актив вещества и сравнить каждый элемент с текстом актив вещ в заголовке
        let randLink = links[Math.floor(Math.random()*len)];
        const linkTxt = randLink.getText();

        assert.equal(activeSubstanceFromHeader, linkTxt, "Активное вещество из заголовка и активное вещество из блока товара не совпадают!");
    }

    getActiveSubstanceTitle() {
        AllureReporter.addStep('Получение заголовка раздела активного вещества');
        browser.waitUntil(
            () => this.activeSubstanceHeader.isDisplayed() === true,
            {
                timeout: 10000,
                timeoutMsg: 'Заголовок раздела поиска по активному веществу не отображается!'
            }
        );
        const headerText = (this.activeSubstanceHeader).getText();
        let activeSubstanceFromHeader = headerText.substr(headerText.indexOf(" ") + 25);
        return activeSubstanceFromHeader;
    }

}

module.exports = new ActiveSubstancePage();