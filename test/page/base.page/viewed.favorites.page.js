const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');
const catalogHelper = require("../../helpers/catalog.helper");
const searchData = require("../../testdata/searchdata");

class ViewedAndFavoritesPage {
    get viewedAndFavoritesPanel() {return $('//div[@data-role="lower-panel-inner"]');}

    get buttonFavorites() {return $('//a[@data-amplitude-action="favourite-link"]');}

    get buttonViewed() {return this.viewedAndFavoritesPanel.$('.//div[@id="view_tab"]');}

    get arrowSlickNext() {return this.viewedAndFavoritesPanel.$('.//span[@class="slick-arrow slick-next"]');}

    get arrowSlickPrev() {return this.viewedAndFavoritesPanel.$('.//span[@class="slick-arrow slick-prev"]');}

    get buttonOpenPanel() {return this.viewedAndFavoritesPanel.$('.//a[@class="sec-sticky__open"]');}

    get buttonHidePanel() {return this.viewedAndFavoritesPanel.$('.//a[@class="sec-sticky__hide"]');}

    get transition() {return this.viewedAndFavoritesPanel.$('.//div[contains(@style, "transition") and @class="slick-track"]');}

    get productsCollection() {return this.viewedAndFavoritesPanel.$$('.//div[contains(@class, "slick-slide") and @aria-hidden="false"]//div[@class="product-card__title"]//a');}

    get buttonsBuyCollection() {return this.viewedAndFavoritesPanel.$$('.//div[contains(@class, "slick-slide") and @aria-hidden="false"]//button[@data-action="addToCart"]');}

    get buttonsInCartCollection() {return this.viewedAndFavoritesPanel.$$('.//div[contains(@class, "slick-slide") and @aria-hidden="false"]//a[@class="btn btn-in-cart btn-sm in-cart" and contains(., "В корзине")]');}

    get buttonLike() {return $('.//a[@class="like active card__like--active is-active"]');}

    openFavoritesList() {
        AllureReporter.addStep('Открытие списка избранного');
        this.buttonFavorites.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'После добавления товара в избранное - поле избранного не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonFavorites);
    }

    openViewedAndFavorites() {
        AllureReporter.addStep('Открытие панели "Просмотренное/Избранное"');
        this.buttonOpenPanel.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Кнопка открытия панели "Просмотренное/Избранное" не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonOpenPanel);
    }

    closeViewedAndFavorites() {
        AllureReporter.addStep('Закрытие блока "Просмотренное/Избранное"');
        this.buttonHidePanel.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'После добавления товара в избранное - поле избранного не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonHidePanel);
    }

    checkNoArrowSlicks() {
        AllureReporter.addStep('Проверка отсутствия стрелок для прокрутки в блоке "Просмотренное/Избранное"');
        assert.equal(
            this.arrowSlickNext.isDisplayed(),
            false
        );
        assert.equal(
            this.arrowSlickPrev.isDisplayed(),
            false
        );
    }

    waitUntilTransitionIsEnd() {
        AllureReporter.addStep('Ожидание прокрутки товаров в карусели');
        this.transition.waitForExist({
            timeout: 10000,
            timeoutMsg: 'Слишком долгая прокрутка',
            reverse: true
        });
    }

    getFirstPositionAtFavoritesName() {
        AllureReporter.addStep('Проверка наименования первого товара в Избранном');
        this.productsCollection[0].waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Первый(самый левый) товар в списке избранного не отображается!'
        });
        return this.productsCollection[0].getAttribute("href");
    }

    checkSlickPrev() {
        AllureReporter.addStep('Проверка прокрутки к предыдущему товару в Избранном');
        let firstFavorite = this.getFirstPositionAtFavoritesName();
        this.arrowSlickPrev.click();
        this.waitUntilTransitionIsEnd();
        const favCollection = this.productsCollection;
        let secondFavorite = favCollection[1].getAttribute("href");
        this.arrowSlickNext.click();
        this.waitUntilTransitionIsEnd();
        assert.equal(
            secondFavorite,
            firstFavorite,
            "Прокрутка к предыдущему товару была неуспешной. Товар, находящийся на первой позиции позиции, после нажатия на стрелку влево, не переместился на вторую позицию!"
        );
    }

    checkSlickNext() {
        AllureReporter.addStep('Проверка прокрутки к следующему товару в Избранном');
        const favCollection = this.productsCollection;
        let secondFavorite = favCollection[1].getAttribute("href");
        this.arrowSlickNext.click();
        this.waitUntilTransitionIsEnd();
        let newFirstFavorite = this.getFirstPositionAtFavoritesName();
        assert.equal(
            secondFavorite,
            newFirstFavorite,
            "Прокрутка к следующему товару была неуспешной. Товар, находящийся на второй позиции, после нажатия на стрелку вправо, не переместился на первую позицию!"
        );
    }

    clickButtonsBuy(index) {
        AllureReporter.addStep('Нажатие кнопок Купить в списке избранного');
        let products = this.productsCollection;
        let addedProducts = [];
        for (let i = 0; i < index; i++) {
            let buttons = [];
            this.buttonsBuyCollection.forEach(function(item) {
                if (item.isDisplayed() === true) buttons.push(item);
            });
            const len = buttons.length;
            const randBtn = buttons[Math.floor(Math.random()*len)];
            const index = buttons.indexOf(randBtn);
            randBtn.waitForClickable({
                timeout: 5000,
                timeoutMsg: 'Кнопка Купить в списке избранного недоступна для клика!'
            });
            randBtn.click();
            randBtn.waitForClickable({
                timeout: 5000,
                reverse: true,
                timeoutMsg: 'Кнопка Купить не исчезла после нажатия!'
            });
            addedProducts.push(products[index].getAttribute('data-name'));
            products.splice(index, 1);
        }
        return addedProducts;
    }

    clickButtonInCart() {
        AllureReporter.addStep('Нажатие кнопки В корзине в списке избранного');
        let buttons = [];
        this.buttonsInCartCollection.forEach(function(item) {
            if (item.isDisplayed() === true) buttons.push(item);
        });
        let len = buttons.length;
        let randBtn = buttons[Math.floor(Math.random()*len)];
        randBtn.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка В корзине в списке избранного недоступна для клика!'
        });
        randBtn.click();
    }

    removePositionFromFavorites() {
        AllureReporter.addStep('Удаление товара из избранного');
        this.buttonLike.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка удаления товара из всплывающего блока избранного не отображается или недоступна для клика!'
        });
        this.buttonLike.click();
        this.buttonFavorites.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'После удаления последнего товара из избранного - поле избранного не исчезло!',
            reverse: true
        });
    }

    checkViewedIsActive() {
        AllureReporter.addStep('Проверка активности вкладки просмотренных товаров в блоке "Просмотренное/Избранное"');
        wdioExpect(this.buttonViewed).toHaveAttributeContaining(
            'class',
            'active',
            {message: 'Вкладка просмотренных товаров не активна!'}
        );
    }

    checkViewedCount(count) {
        AllureReporter.addStep('Проверка счетчика просмотренных товаров в блоке "Просмотренное/Избранное"');
        wdioExpect(this.buttonViewed).toHaveTextContaining(
            `${count}`,
            {message: 'Счетчик просмотренных товаров не содержит ожидаемое количество товаров!'}
        );
    }

    checkGoodsNameInViewed(name) {
        AllureReporter.addStep('Проверка наименования товара в просмотренных товарах в блоке "Просмотренное/Избранное"');
        wdioExpect(this.productsCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'В просмотренных товарах нет товаров!'
        });
        let productsNames = [];
        this.productsCollection.forEach(product => {
            productsNames.push(product.getAttribute('data-name'));
        });
        assert.include(
            productsNames,
            name,
            'В просмотренных товарах нет ожидаемого товара!'
        );
    }
}

module.exports = new ViewedAndFavoritesPage();
