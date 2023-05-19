const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPageInstruction {
    get navigationBarInstructionTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="instructions"]//a');}

    get instructionTitle() {return $('//h2[@class="offer-instruction__title"]');}

    get instructionItemTitlesCollection() {return $$('//*[@id="binstructions"]/h2" and not(contains(., "Условия отпуска из аптек"))]//h3[@class="offer-instruction__item-title"]');}

    get buttonsScrollToInstructionItemCollection() {return $$('//div[@id="binstructions"]//a[@class="scrollTo"]');}

    checkScrollToInstructionItem() {
        AllureReporter.addStep('Нажатие на каждый пункт в инструкции на КТ и проверка прокрутки до пункта инструкции');
        const itemTitles = this.instructionItemTitlesCollection;
        const buttons = this.buttonsScrollToInstructionItemCollection;
        buttons.forEach(b => {
            b.waitForClickable({
                timeout: 10000,
                timeoutMsg: 'Кнопка перехода к пункту меню в инструкции недоступна для клика!'
            });
            let btnTxt = b.getText();
            let index = buttons.indexOf(b);
            browser.execute("arguments[0].click();", b);
            let title = itemTitles[index];
            let titleTxt = title.getText();
            wdioExpect(title).toBeDisplayedInViewport({
                message: 'После нажатия на кнопку в инструкции на КТ не был осуществлен скролл к соответствующему пункту инструкции'
            });
            assert.equal(
                titleTxt,
                btnTxt,
                `Порядковый номер кнопки не соответствует порядковому номеру раздела иструкции! \n 
                Кнопка ${btnTxt} по счету ${index + 1} и ей соответствует раздел ${titleTxt}!`
            );
        });
    }

    checkInstructionTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Инструкции"');
        this.instructionTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок инструкции не отображается!'
        });
        assert.equal(
            `${this.instructionTitle.getText()}`,
            "Инструкция по применению",
            "Некорректный заголовок инструкции!"
        );
    }

    clickNavigationBarInstructionTab() {
        AllureReporter.addStep('Нажатие на вкладку "Инструкция"');
        this.navigationBarInstructionTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Инструкция" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarInstructionTab);
    }

}

module.exports = new GoodsPageInstruction();