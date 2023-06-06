const { default: AllureReporter } = require('@wdio/allure-reporter');

class ChangeCityPage {

    get buttonCitySelect() {return $('//div[@class="select_in"]');}

    get buttonConfirmCityChoise() {return $('//div[contains(@class, "header__tower-box")]//a[@data-action="changeCity"]');}

    get buttonConfirmCurrentCity() {return $('//*[@class="header__tower-skip header__tower-skip--close header__tower-skip--search header__skip-search btn btn-primary btn-sm w-100"]');}

    get buttonChangeCity() {return $('//*[text()="Нет, другой"]');}

    get fieldSearchCity() {return $('//*[@class="header__tower-input"]');}

    get buttonPickFirstSearchResult() {return $('//*[contains(@class, "header__tower-link")]');}

    get buttonCloseNotification() {return $('//button[@class="notification__close"]');}

    get buttonCloseChangeCityBlock() {return $('//button[@class="header__tower-close"]');}

    changeCityTo(cityName) {
        AllureReporter.addStep(`Смена города на ${cityName}`);
        try {
            this.closeChangeCityBlock();
        } catch (error) {}
        this.clickButtonCitySelect();
        this.setCity(cityName);
        this.pickFirstSearchResult();
        this.clickButtonConfirmCurrentCity();
    }

    changeCityOnMobile(cityName) {
        AllureReporter.addStep(`Смена города на ${cityName} в мобильной версии сайта`);
        this.clickButtonChangeCity();
        this.setCity(cityName);
        this.pickFirstSearchResult();
        this.clickButtonConfirmCityChoise();
    }

    closeChangeCityBlock() {
        AllureReporter.addStep('Нажатие на кнопку закрытия блока смены города');
        this.buttonCloseChangeCityBlock.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка закрытия окна выбора города недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.buttonCloseChangeCityBlock);
    }

    clickButtonConfirmCurrentCity() {
        AllureReporter.addStep('Нажатие на кнопку "Да, я тут" для подтверждения текущего города');
        try {
            this.buttonConfirmCurrentCity.waitForClickable({timeout: 10000,
                timeoutMsg: 'Кнопка "Да я тут" на странице подтвеждения текущего города недоступна для клика!'
            });
            this.buttonConfirmCurrentCity.click();
        } catch (e) {}
    }

    clickButtonConfirmCityChoise() {
        AllureReporter.addStep('Нажатие на кнопку "Да, я тут" для подтверждения смены города');
        this.buttonConfirmCityChoise.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Да я тут" на странице подтвеждения текущего города недоступна для клика!'
        });
        this.buttonConfirmCityChoise.click();
        this.buttonConfirmCityChoise.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Да я тут" на странице подтвеждения текущего города недоступна для клика!',
            reverse: true
        });
    }

    pickFirstSearchResult() {
        AllureReporter.addStep('Нажатие на первый подходящий под запрос город');
        this.buttonPickFirstSearchResult.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Город в списке городов для смены недоступен для клика!'
        });
        this.buttonPickFirstSearchResult.click();
    }

    setCity(cityName) {
        AllureReporter.addStep('Ввод города');
        this.fieldSearchCity.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Поле ввода для поиска города не отображается!'
        });
        this.buttonPickFirstSearchResult.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Список городов не отображается!'
        });
        this.fieldSearchCity.setValue(cityName);
        wdioExpect(this.buttonPickFirstSearchResult).toHaveTextContaining(
            `${cityName}`,
            {message: 'В первом результате поиска нет указанного горда!'}
        );
    }

    clickButtonChangeCity() {
        AllureReporter.addStep('Нажатие на кнопку "Нет, другой"');
        this.buttonChangeCity.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Нет, другой недоступна для клика!'
        });
        this.buttonChangeCity.click();
    }

    clickButtonCitySelect() {
        AllureReporter.addStep('Нажатие на кнопку выбора города');
        this.buttonCitySelect.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка выбора города недоступна для клика!'
        });
        this.buttonCitySelect.click();
    }

}

module.exports = new ChangeCityPage();