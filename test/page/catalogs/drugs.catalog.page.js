const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class DrugsCatalogPage {
    get countOfDrugsVariants() {return $('//ul[@id="catalog-item-menu"]//a[contains(., "Варианты") and @href="#bforms"]//span');} 

    get drugsCollection() {return $$('//section[@data-role="offer-item"]//a[@class="listing-card__title-link"]');}

    get drugsCatalogTitle() {return $('//section[@class="sec-inner "]//h1');}

    get buttonAnalogCollection() {return $$('//*[@data-ga-event="Analog"]');}

    get manufacturerLinkCollection() {return $$('//div[@class="listing-card__info"]//a[contains(@href, "/goods/manufacturer/")]');}

    get activeSubstanceLinkCollection() {return $$('//div[@class="listing-card__info"]//a[contains(@href , "/goods/active_ingredient/")]');}

    get titleOfProductWithAnalogsCollection() {return $$('//*[@data-ga-event="Analog"]//ancestor::section/div[@class="listing-card__content"]/h5/a');}

    get titleOfProductWithAnalogsMobileCollection() {return $$('//p[@data-ga-event="Analog"]/parent::div/parent::div/parent::section//a[@class="listing-card__title-link"]');}

    clickActiveSubstanceLink() {
        AllureReporter.addStep('Нажатие на ссылку активного вещества в каталоге товаров');
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
    
    //TODO: Manufacturer с маленькой буквы. Поправить название метода и обновить тесты
    clickmanufacturerLink() {
        AllureReporter.addStep('Нажатие на ссылку производителя в каталоге товаров');
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
    
    clickButtonAnalog() {
        AllureReporter.addStep('Нажатие на кнопку "Аналог от _" в каталоге товаров');
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

    clickMobileButtonAnalog() {
        AllureReporter.addStep('Нажатие на кнопку "Аналог от _" в каталоге товаров');
        const buttons = this.buttonAnalogCollection;
        const len = buttons.length;
        let randomButtonAnalog = buttons[Math.floor(Math.random()*len)];
        let indexBtn = buttons.indexOf(randomButtonAnalog);
        let titles = this.titleOfProductWithAnalogsMobileCollection;
        let randTitle = titles[indexBtn];
        let titleTxt = randTitle.getText();

        browser.waitUntil(
            () => randomButtonAnalog.isClickable() === true,
            {
                timeout: 5000,
                timeoutMsg: 'Кнопка "Аналог от _" недоступна для клика!'
            }
        );
        randomButtonAnalog.waitForClickable({timeout: 5000, timeoutMsg: 'Кнопка "Аналог от _" в метакатегории товаров недоступна для клика!'});
        const analogsButtonText = randomButtonAnalog.getText();
        const analogsCount = analogsButtonText.substr(0,analogsButtonText.indexOf(" "));
        browser.execute("arguments[0].click();", randomButtonAnalog);
        return [analogsCount, titleTxt];
    }

    checkDrugsCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога лекарств');
        this.drugsCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога лекарств не отображается!'
        });
        const title = this.drugsCatalogTitle.getText();
        assert.equal(title, "Лекарственные средства", "Некорректный заголовок раздела каталога лекарств!");
    }

    checkCountOfVariants() {
        AllureReporter.addStep('Проверка количества вариантов в счетчике');
        const count = this.countOfDrugsVariants.getText();
        const countOfSearchResults = (this.drugsCollection).length;

        assert.equal(count, countOfSearchResults, "Число в счетчике вариантов и фактическое количество элементов в выдаче не совпадает!");
    }
}

module.exports = new DrugsCatalogPage();