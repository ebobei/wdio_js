const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should();

class IntimCatalogPage {
    get intimCatalogTitle() {return $('//div[@class="sec-categories row mb-4"]//h1');}

    get confirmAgePopupTitle() {return $('//div[@class="age-popup--box is-shown"]//div[@class="age-popup--text"]');}

    get buttonUnderEighteen() {return $('//div[@class="age-popup--btns"]//a[@class="age-popup--btn is-dark js-age-no"]');}

    get ageAlert() {return $('//div[@class="age-popup--box is-shown"]//div[@class="age-popup--text" and .="Вам меньше 18 лет!"]');}

    get buttonGoToMainPage() {return $('//div[@class="age-popup--box is-shown"]//a[@class="age-popup--btn is-dark"]');}

    get buttonOverEighteen() {return $('//div[@class="age-popup--box is-shown"]//a[@class="age-popup--btn is-yellow js-age-yes"]');}

    clickButtonOverEighteen() {
        AllureReporter.addStep('Нажатие на кнопку "Мне уже 18"');
        this.buttonOverEighteen.waitForClickable({
            timeout: 35000,
            timeoutMsg: 'Кнопка "Мне уже 18" недоступна для клика или не отображается!'
        });
        const buttonText = this.buttonOverEighteen.getText();
        assert.equal(buttonText, "Мне уже 18", "Некорректный текст кнопки 'Мне уже 18'!");
        this.buttonOverEighteen.click();
    }

    clickButtonGoToMainPage() {
        AllureReporter.addStep('Нажатие на кнопку "На главную"');
        this.buttonGoToMainPage.waitForClickable({
            timeout: 10000, 
            timeoutMsg: 'Кнопка "На главную" недоступна для клика или не отображается!'
        });
        this.buttonGoToMainPage.click();
    }

    checkAgeAlert() {
        AllureReporter.addStep('Проверка появления алерта о недостаточном возрасте для просмотра при нажатии на кнопку "Мне нет 18"');
        this.ageAlert.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Алерт о недостаточном возрасте для просмотра при нажатии на кнопку "Мне нет 18" не отображается!'
        });
    }

    clickButtonUnderEighteen() {
        AllureReporter.addStep('Нажатие на кнопку "Мне нет 18"');
        this.buttonUnderEighteen.waitForClickable({
            timeout: 15000, 
            timeoutMsg: 'Кнопка "Мне нет 18" недоступна для клика!'
        });
        const buttonText = this.buttonUnderEighteen.getText();
        assert.equal(buttonText, "Мне нет 18", "Некорректный текст кнопки 'Мне нет 18'!");
        this.buttonUnderEighteen.click();
    }

    checkConfirmAgePopupTitle() {
        AllureReporter.addStep('Проверка текста в окне подтверждения возраста при переходе в категорию "Интим"');
        this.confirmAgePopupTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Всплывающее окно для подтверждения возраста при переходе в каталог интимных товаров не отображается!'
        });
        const title = this.confirmAgePopupTitle.getText();
        assert.equal(title, "Перед просмотром необходимо подтвердить возраст", "Некорректный текст в окне подтверждения возраста при переходе в категорию 'Интим'!");
    }

    checkIntimCatalogTitle() {
        AllureReporter.addStep('Проверка заголовка каталога "Интим"');
        this.intimCatalogTitle.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Заголовок каталога "Интим" не отображается!'
        });
        const title = this.intimCatalogTitle.getText();
        assert.equal(title, "Интим", "Некорректный заголовок раздела каталога 'Интим'!");
    }
}

module.exports = new IntimCatalogPage();