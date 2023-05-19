const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class SearchPage {
    get fieldSearch() {return $('//input[@id="search"]');}

    get fieldShortSearch() {return $('//input[@name="q"]');}

    get goodsPriceInHint() {return $$('//span[@class="price"]//strong');}

    get searchHint() {return $('//label[@data-neon-alias="search_hint"]');}

    get buttonClearFieldSearch() {return $('//button[@class="searchbar__clear"]');}

    get searchQueryInHistoryCollection() {return $$('//div[@class="searchbar__tips header__tips"]//a[contains(@href, "/search/?q=") and @data-suggest-type="history"]//span[@data-role="search.suggest.name"]');}

    get buttonSearch() {return $('//button[@class="searchbar__button btn btn-warning"]');}

    get buttonShortSearch() {return $('//*[@id="dompharm_autocomplete"]//button[@type="submit"][contains(text(),"Найти")]');}

    get goodsCategoryInHint() {return $('//span[contains(., " нео суспензия")]');}

    get popularCategoriesCollection() {return $$('//a[@data-suggest-type="popular"]');}

    checkPopularCategories() {
        AllureReporter.addStep('Проверка популярных категорий');
        assert.equal(
            this.popularCategoriesCollection.length,
            8,
            "Количество популярных категорий не равно четырем!"
        );
    }

    clickGoodsCategoryInHint() {
        AllureReporter.addStep('Нажатие на категорию лекарств в подсказке');
        this.goodsCategoryInHint.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Подсказка с категорией товара недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.goodsCategoryInHint);
    }

    clickGoodsInHint() {
        AllureReporter.addStep('Нажатие лекарство из подсказки');
        this.goodsTitleInHint.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Подсказка с наименованием товара недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.goodsTitleInHint);
    }

    checkHintContainsPrice() {
        AllureReporter.addStep('Проверка наличия цены в подсказке при вводе поискового запроса');
        wdioExpect(this.goodsPriceInHint).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Нет ни одной цены в подсказках при вводе поискового запроса!'
        });
        this.goodsPriceInHint.forEach(price => {
            assert.isNotEmpty(price.getText(), "Цена не отображается в подсказке!");
        });
    }

    clickButtonSearch() {
        AllureReporter.addStep('Нажатие на кнопку "Найти"');
        this.buttonSearch.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Найти" недоступна для клика!'
        });
        this.buttonSearch.click();
    }

    clickButtonShortSearch() {
        AllureReporter.addStep('Нажатие на кнопку "Найти"');
        this.buttonShortSearch.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Найти" недоступна для клика! На короткой форме поиска.'
        });
        this.buttonShortSearch.click();
    }

    clickSearchBar() {
        AllureReporter.addStep('Нажатие на строку поиска');
        this.searchHint.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Поле поиска недоступно для клика!'
        });
        this.searchHint.click();
    }

    checkSearchFieldCleaning() {
        AllureReporter.addStep('Проверка успешной очистки поля поиска');
        wdioExpect(this.fieldSearch).toHaveText('', {
            wait: 3000,
            message: 'После нажатия на поле очиски поля поиска всё ещё отображается текст!'
        });
        this.buttonClearFieldSearch.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка очистки доступна для клика после нажатия!',
            reverse: true
        });
    }

    clearSearchField() {
        AllureReporter.addStep('Очистка поля поиска по клику на крестик');
        this.buttonClearFieldSearch.waitForClickable({
            timeout: 3000,
            timeoutMsg: 'Кнопка очистки поля поискового запроса недоступна для клика!'
        });
        this.buttonClearFieldSearch.click();
    }

    inputSearchQuery(query) {
        AllureReporter.addStep(`Ввод поискового запроса ${query}`);
        this.fieldSearch.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Поле ввода поискового запроса не отображается!'
        });
        this.fieldSearch.setValue(query);
    }

    inputShortSearchQuery(query) {
        AllureReporter.addStep(`Ввод поискового запроса ${query}`);
        this.fieldShortSearch.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Поле ввода поискового запроса не отображается!'
        });
        this.fieldShortSearch.setValue(query);
    }

    checkSearchFieldIsVisible() {
        AllureReporter.addStep('Проверка видимости поля поиска');
        wdioExpect(this.fieldSearch).toBeDisplayedInViewport({
            wait: 3000,
            message: 'Поле поиска не отображается в КТ!'
        });
    }
}

module.exports = new SearchPage();
