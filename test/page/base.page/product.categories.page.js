const { default: AllureReporter } = require('@wdio/allure-reporter');

class ProductCategoriesPage {
    get firstCategoryInNavBar() {return $('//a[@class="header__nav-link first"]');}

    get buttonBeautyInNavbar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="beauty"]');}

    get buttonHygieneInNavbar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="hygiene"]');}

    get buttonLensesInNavBar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="lenses"]');}

    get buttonMotherAndKidsInNavBar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="mother"]');}

    get buttonMedicalInNabBar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="medical"]');}

    get buttonIntimInNavBar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="intim"]');}

    get buttonZooInNavBar() {return $('//li[@class="header__nav-item "]//a[@class="header__nav-link " and @data-ga-event="zootovary"]');}

    clickButtonZooInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Зоотовары" в навбаре');
        this.buttonZooInNavBar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Зоотовары" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonZooInNavBar);
    }

    clickButtonIntimInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Интим" в навбаре');
        this.buttonIntimInNavBar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Интим" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonIntimInNavBar);
    }

    clickButtonMedicalInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Медтовары" в навбаре');
        this.buttonMedicalInNabBar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Медтовары" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonMedicalInNabBar);
    }

    clickButtonMotherAndKidsInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Мать и дитя" в навбаре');
        this.buttonMotherAndKidsInNavBar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Мать и дитя" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonMotherAndKidsInNavBar);
    }

    clickButtonLensesInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Линзы" в навбаре');
        this.buttonLensesInNavBar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Линзы" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonLensesInNavBar);
    }

    clickButtonHygieneInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Гигиена" в навбаре');
        this.buttonHygieneInNavbar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Гигиена" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonHygieneInNavbar);
    }

    clickButtonBeautyInNavbar() {
        AllureReporter.addStep('Нажатие на кнопку "Красота" в навбаре');
        this.buttonBeautyInNavbar.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Красота" в навбаре недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonBeautyInNavbar);
    }

    clickFirstCategoryInNavBar() {
        AllureReporter.addStep('Нажатие на кнопку "Лекарства и БАД"');
        this.firstCategoryInNavBar.waitForClickable({
            timeout: 15000,
            timeoutMsg: 'Кнопка "Лекарства и БАД" в навбаре недоступна для клика или не отображается!'
        });
        this.firstCategoryInNavBar.scrollIntoView(false);
        browser.execute("arguments[0].click();", this.firstCategoryInNavBar);
    }
}

module.exports = new ProductCategoriesPage();