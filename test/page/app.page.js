const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');

class AppPage {
    get buttonIosApp() {return $$('//img[contains(@data-original, "appstore")]/parent::*');}

    get buttonAndroidApp() {return $$('//img[contains(@data-original, "googleplay")]/parent::*');}

    get appPageTitle() {return $('//div[@class="tn-atom" and contains(., "Аптека")]');}

    clickButtonIosApp() {
        AllureReporter.addStep('Нажатие на кнопку AppStore');
        let buttons = this.buttonIosApp;
        let firstBtn = buttons[0];
        firstBtn.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка перехода в AppStore не отображается на странице лендинга!'
        });
        firstBtn.click();
    }

    clickButtonAndroidApp() {
        AllureReporter.addStep('Нажатие на кнопку GooglePlay');
        let buttons = this.buttonAndroidApp;
        let firstBtn = buttons[0];
        firstBtn.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка перехода в GooglePlay не отображается на странице лендинга!'
        });
        firstBtn.click();
    }

    checkAppPageTitle() {
        AllureReporter.addStep('Проверка заголовков страницы мобильных приложений');
        this.appPageTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок лендинга для переходы в мобильные сторы не отображается!'
        });
        assert.equal(
            `${browser.getTitle()}`,
            "СБЕР ЕАПТЕКА - официальное приложение. Теперь Аптека у вас в кармане!",
            "Некорректный заголовок в браузере у лендинга мобильных приложений!"
        );
        assert.equal(
            `${this.appPageTitle.getText()}`,
            "Аптека у вас\nв кармане",
            "Некорректный текст заголовка на странице перехода в магазины приложений!"
        );
    }

    //TODO: Проверка ссылки, а не заголовка. Поправить название метода и вставить корректное название в тесты
    checkAppStoreTitle() {
        AllureReporter.addStep('Получение ссылки после перехода в AppStore');
        this.appPageTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Кнопка "AppStore" отображается после нажатия, переход в Appstore не был осуществлен!',
            reverse: true
        });
        const url = browser.getUrl();
        assert.include(
            `${url}`,
            "https://apps.apple.com/app/",
            "Некорректная ссылка в браузере после перехода на страницу App Store!"
        );
    }

    checkGooglePlayTitle() {
        AllureReporter.addStep('Получение заголовка после перехода в GooglePlay');
        this.appPageTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Кнопка "GooglePlay" отображается после нажатия, переход в GooglePlay не был осуществлен!',
            reverse: true
        });
        const title = browser.getTitle();
        assert.equal(
            `${title}`,
            "ЕАПТЕКА — онлайн аптека - Apps on Google Play",
            "Некорректный заголовок в браузере после перехода на страницу App Store!"
        );
    }
}

module.exports = new AppPage();