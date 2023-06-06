const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');
const goodsPageProductDetail = require('../goods.page/goods.page.product.detail');

class GoodsPageReview {
    get goodsReviewForm() {return $('//div[@class="sec-item__reviews-item-form mt-0 mb-3"]');}

    get buttonWriteGoodsReview() {return $('//a[.="Написать отзыв"]');}

    get buttonCloseGoodsReviewForm() {return $('//a[@class="sec-item__reviews-item-form-close"]');}

    get starsToRateCollection() {return $$('//div[@class="rating s0 toChange ml-0 mt-0"]//i');}

    get fieldReviewAuthorName() {return $('//input[@name="NAME"]');}

    get fieldReviewAuthorEMail() {return $('//input[@name="EMAIL"]');}

    get fieldReviewText() {return $('//textarea[@name="TEXT"]');}

    get buttonSendReview() {return $('//div[@class="sec-item__reviews-item-form mt-0 mb-3"]//button[@type="submit"]');}

    get successMessageText() {return $('//div[@class="sec-item__reviews-item-form mt-0 mb-3"]//div[@class="success-message mt-2"]');}

    get reviewTitle() {return $('//h4[contains(@class, "reviews-header")]');}

    get buttonAllReviews() {return $('//*[@id="rating-tab"]/a');}

    get goodsReviewCollection() {return $$('//div[@id="brating"]//div[@class="sec-item__reviews-item "]');}

    get ratingTabCounter() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="rating"]//span');}

    get navigationBarRatingTab() {return $('//ul[@id="catalog-item-menu"]//li[@data-b="rating"]//a');}

    get navigationTabCounter() {return this.navigationBarRatingTab.$('.//span');}

    clickNavigationBarRatingTab() {
        AllureReporter.addStep('Нажатие на вкладку "Отзывы"');
        this.navigationBarRatingTab.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Вкладка "Отзывы" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.navigationBarRatingTab);
    }

    checkSuccessMessage() {
        AllureReporter.addStep('Проверка успешной отправки отзыва');
        this.successMessageText.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Не отображается сообщение об успешной отправке отзыва!'
        });
        assert.equal(
            `${this.successMessageText.getText()}`,
            "Спасибо за ваш отзыв!\nМы его разместим после того, как он пройдет модерацию.",
            "Некорректное сообщение об успешной отправке отзыва!"
        );
    }

    setGoodsRating() {
        AllureReporter.addStep('Установка рейтинга в форме отзыва');
        const stars = this.starsToRateCollection;
        const len = stars.length;
        const randomRate = stars[Math.floor(Math.random()*len)];
        randomRate.click();
    }

    assertReviewCounterValueWithActualCount() {
        AllureReporter.addStep('Проверка вкладки "Отзывы"');
        assert.equal(
            `${(this.goodsReviewCollection.length).toString()}`,
            `${this.ratingTabCounter.getText()}`,
            "Количество отзывов не совпадает с счетчиком на вкладке отзывов!"
        );
    }

    checkReviewTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Отзывы"');
        this.reviewTitle.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Заголовок отзывов не отображается!'
        });
        assert.include(
            [
            `${goodsPageProductDetail.goodsTitle.getText()}: ${this.navigationTabCounter.getText()} отзывов покупателей и фармацевтов`,
            `${goodsPageProductDetail.goodsTitle.getText()}: ${this.navigationTabCounter.getText()} отзыва покупателей и фармацевтов`,
            `${goodsPageProductDetail.goodsTitle.getText()}: ${this.navigationTabCounter.getText()} oтзыв покупателей и фармацевтов`,
            ],
            `${this.reviewTitle.getText()}`,
            "Некорректный заголовок отзывов!"
        );
    }

    clickButtonAllReviews() {
        AllureReporter.addStep('Нажатие на кнопку "Смотреть все отзывы"');
        this.buttonAllReviews.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Смотреть все отзывы" недоступна для клика!'
        });
        browser.execute("arguments[0].click();", this.buttonAllReviews);
    }

    clickButtonWriteGoodsReview() {
        AllureReporter.addStep('Нажатие на кнопку "Написть отзыв"');
        this.buttonWriteGoodsReview.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Написать отзыв" доступна для клика!'
        });
        this.buttonWriteGoodsReview.click();
    }

    clickButtonCloseGoodsReviewForm() {
        AllureReporter.addStep('Нажатие на кнопку закрытия формы написания отзыва');
        this.buttonCloseGoodsReviewForm.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка закрытия формы отзыва недоступна для клика!'
        });
        this.buttonCloseGoodsReviewForm.click();
    }

    fillReviewForm() {
        AllureReporter.addStep('Заполнение формы отзыва');
        this.goodsReviewForm.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Форма отзыва не отображается!'
        });
        this.fieldReviewAuthorName.setValue('Автор отзыва ТЕСТ');
        this.fieldReviewAuthorEMail.setValue('test@yandex.ru');
        this.fieldReviewText.setValue('Это тестовый отзыв!');
    }

    clickButtonSendReview() {
        AllureReporter.addStep('Нажатие на кнопку "Отправить отзыв"');
        this.buttonSendReview.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка "Отправить отзыв" не отображается!'
        });
        this.buttonSendReview.click();
    }
}

module.exports = new GoodsPageReview();