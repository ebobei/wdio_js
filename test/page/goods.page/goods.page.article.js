const { default: AllureReporter } = require('@wdio/allure-reporter');
const chai = require('chai')
    , assert = chai.assert;

class GoodsPageArticle {
    get articlesBlock() {return $('//div[@class="articles"]');}

    get articlesBlockTitle() {return this.articlesBlock.$('.//div[contains(@class, "title")]');}

    get buttonAllArticles() {return this.articlesBlock.$('.//a[contains(@class, "all")]');}

    get articlesCollection() {return this.articlesBlock.$$('.//a[contains(@class, "item")]//div');}

    checkArticlesTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Статьи"');
        this.articlesBlock.scrollIntoView(false);
        this.articlesBlockTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Статьи" не отображается!'
        });
        assert.equal(
            `${this.articlesBlockTitle.getText()}`,
            "Статьи",
            "Некорректный заголовок раздела Статьи!"
        );
    }

    clickButtonAllArticles() {
        AllureReporter.addStep('Нажатие на кнопку "Все статьи"');
        this.articlesBlock.scrollIntoView(false);
        this.buttonAllArticles.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Все статьи не доступна для клика!'
        });
        this.buttonAllArticles.click();
    }

    clickArticleLink() {
        AllureReporter.addStep('Нажатие на заголовок статьи');
        this.articlesBlock.scrollIntoView(false);
        const titles = this.articlesCollection;
        wdioExpect(titles).toBeElementsArrayOfSize({
            gte: 1,
            message: 'На КТ нет ни одной доступной статьи!'
        });
        const title = titles[Math.floor(Math.random()*titles.length)];
        title.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Заголовок статьи не доступен для клика!'
        });
        title.click();
    }
}

module.exports = new GoodsPageArticle();