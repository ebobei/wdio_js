const { default: AllureReporter } = require('@wdio/allure-reporter');

class ContactsPage {
    get contactsTitle() {return $('//h1[@class="sec-inner__title"]');}

    checkContactsTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Контакты"');
        this.contactsTitle.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Раздел "Контакты" не был открыт!'
        });
    }
}

module.exports = new ContactsPage();