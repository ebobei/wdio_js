const { default: AllureReporter } = require('@wdio/allure-reporter');

class CareerPage {
    get vacancyTitle() {return $('//div[contains(text(), "Наши вакансии")]');}

    get companyTitle() {return $('//div[contains(text(), "О компании")]');}

    get vacanciesCollection() {return $$('//div[contains(@class, "t668__header")]');}

    checkVacancyTitles() {
        AllureReporter.addStep('Проверка заголовков в разделе "Карьера"');
        this.companyTitle.scrollIntoView(false);
        wdioExpect(this.companyTitle).toBeDisplayed({
            message: 'Не отображается заголовок "О компании"'
        });
        this.vacancyTitle.scrollIntoView(false);
        wdioExpect(this.vacancyTitle).toBeDisplayed({
            message: 'Не отображается заголовок "Наши вакансии"'
        });
    }

    checkVacanciesList() {
        AllureReporter.addStep('Проверка списка вакансий');
        wdioExpect(this.vacanciesCollection).toBeElementsArrayOfSize({
            gte: 0,
            message: 'Не отображается ни одной вакансии!'
        });
        const randomVacancy = this.vacanciesCollection[Math.floor(Math.random()*this.vacanciesCollection.length)];
        randomVacancy.click();
        wdioExpect(randomVacancy).toHaveAttributeContaining(
            'class',
            'opened',
            {message: 'Не открылись подробности о вакансии!'}
        );
    }
}

module.exports = new CareerPage();