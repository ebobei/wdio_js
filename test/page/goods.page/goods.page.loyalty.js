const { default: AllureReporter } = require('@wdio/allure-reporter');

class GoodsPageLoyalty {
    get bonusCount() {return $('//div[contains(@class, "offer-card")]//div[@class="card-bonus__count"]');}

    getBonuses() {
        AllureReporter.addStep('Получение количества бонусов за товар');
        wdioExpect(this.bonusCount).toBeDisplayed({
            message: 'Бонусы за товар не отображаются!'
        });
        const bonusText = this.bonusCount.getText();
        return Number(bonusText.replace(/[^\d]/g, ''));
    }
}

module.exports = new GoodsPageLoyalty();