const { default: AllureReporter } = require('@wdio/allure-reporter');
const { assert } = require('chai');
const brandsPage = require("../../page/brands.page");

class MainPage {
    get buttonSaleFromHeader() {return $('//li[@data-code="sale"]//a[contains(@href, "sale")]');}

    get saleTitle() {return $('//h1[.="Скидки"]');}

    get buttonStockFromHeader() {return $('//a[@class="btn btn-sm btn-hmetac btn-primary"]');}

    get buttonAllArticles() {return $('//*[@class="articles--all"]');}

    get articleLinkTitlesCollection() {return $$('//*[@class="articles--item" and contains(@href , "/articles/")]//div');}

    get brands() {return $('//div[@class="pop-brands"]');}

    get buttonAllBrands() {return this.brands.$('.//a[@href="/goods/brand/"]');}

    get brandsTab() {return (text) => this.brands.$(`.//ul[@class="pop-brands--tabs"]//li//a[text()="${text}"]`);}

    get brandsTabList() {return (dataId) => this.brands.$$(`.//div[@class="pop-brands--scroll-inner"]//div[@data-id="${dataId}" and contains(@class , "shown")]//a[contains(@href , "/goods/brand/")]`);}

    get brandsTabListImg() {return (dataId) => this.brands.$$(`.//div[@class="pop-brands--scroll-inner"]//div[@data-id="${dataId}" and contains(@class , "shown")]//a[contains(@href , "/goods/brand/")]//img`);}

    get stockBanner() {return $('//div[@class="banners banners_at_promo row"]//div[@class="banners__col mb-4"]//a[contains(@href, "/company/stock/")]');}

    get buttonAllStock() {return $('//a[@class="promo--all"]');}

    get subscribeHeader() {return $('//div[@class="subscription--title"]');}

    get fieldEmailForSubscribe() {return $('//*[@name="EMAIL"]');}

    get buttonSubscribe() {return $('//button[.="Подписаться"]');}

    get subscribeAlert() {return $('//span[@class="help-block form-error"]');}

    get subscribeSuccessfulHeader() {return $('//div[@class="sec-newsales__done left"]//span');}

    get partnersTitle() {return $('//div[@class="our-partners--title h1"]');}

    get buttonAllPartners() {return $('//a[@class="our-partners--all" and @href="/company/partners/"]');}

    get partnersBlock() {return $('//*[@class="our-partners--scroll"]');}

    get partnersCollection() {return $$('//a[@class="our-partners--item"]');}

    get checkOrderTitle() {return $('//h1[@class="order-check--title"]');}

    get fieldOrderNumber() {return $('//input[@name="order_id"]');}

    get fieldPhoneNumber() {return $('//input[@name="phone"]');}

    get buttonLookAtOrderInfo() {return $('//button[@name="submit"]');}

    get orderStatusTitle() {return $('//section[@class="status-page"]//h1');}

    get productOfTheDayTitle() {return $('//div[ .="Товары дня"]');}

    get productsOfTheDayCollection() {return $$('//div[@class="today-goods__card "]');}

    get buttonsMetaCategoriesCollection() {return $$('//li[@data-neon-alias="metacategories"]//a[contains(@href, "/meta/")]');}

    get reviewsTitle() {return $('//div[@class="reviews--title h1"]');}

    get reviewsBlock() {return $('//div[@class="main--reviews"]');}

    get reviewsCollection() {return $$('//div[@class="reviews--item"]');}

    get buttonAllReviews() {return $('//a[contains(@class, "reviews--all") and contains(., "Все")]');}

    get buttonAllReviewsMobile() {return $('//a[contains(@class, "reviews--all") and contains(., "Посмотреть все")]');}

    get wowSaleBanner() {return $('//*[@class="wow-banner wow-banner__desktop"]');}

    get buttonSignInViaEMail() {return $('//button[.="Войти по почте"]');}

    get buttonPhoneForMobile() {return $('//a[@class="call__btn"]');}

    get buttonAddReview() {return $('//div[@class="reviews--write"]//a[.="Написать отзыв"]');}

    get bannersBlock() {return $('//div[contains(@class , "banners_at_frontpage")]');}

    get bannersBlockLinks() {return this.bannersBlock.$$('.//a');}

    clickButtonAddReview() {
        AllureReporter.addStep('Нажатие на кнопку "Написать отзыв" на главной странице');
        this.buttonAddReview.scrollIntoView(false);
        this.buttonAddReview.waitForClickable({timeout: 5000, timeoutMsg: 'Кнопка "Написать отзыв" на главной странице недоступна для клика!'});
        this.buttonAddReview.click();
    }

    checkPhoneForMobile() {
        AllureReporter.addStep('Нажатие на кнопку звонка на мобильной версии сайта');
        this.buttonPhoneForMobile.waitForClickable({
            timeout: 5000,
            timeoutMsg: 'Кнопка звонка на моб версии сайта недоступна для клика!'
        });
        assert.include(
            `${this.buttonPhoneForMobile.getAttribute('href')}`,
            "tel:",
            "Отсутсвует html5 элемент для переадресации в приложения для звонка!"
        );
    }

    clickButtonSignInViaEMail() {
        AllureReporter.addStep('Нажатие на кнопку "Войти по почте"');
        this.buttonSignInViaEMail.waitForClickable({
            timeout: 15000,
            timeoutMsg: 'Кнопка "Войти по почте" недоступна для клика!'
        });
        this.buttonSignInViaEMail.click();
    }

    getCountOfPartners() {
        AllureReporter.addStep('Получение количества партнеров из счетчика в кнопке "Наши N партнеров"');
        this.buttonAllPartners.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Наши N партнеров" недоступна для клика или не отображается!'
        });
        return (this.buttonAllPartners.getText()).replace(/[^\d]/g, '');
    }

    checkWowSaleBanner() {
        AllureReporter.addStep('Проверка отображения баннера "Wow-скидки"');
        this.wowSaleBanner.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Баннер "Wow-Скидки" не отображается!'
        });
    }

    clickButtonAllReviews() {
        AllureReporter.addStep('Нажатие на кнопку "Все N отзывов"');
        this.buttonAllReviews.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Все N отзывов" недоступна для клика или не отображается!'
        });
        const btnTxt = this.buttonAllReviews.getText();
        const onlyNum = btnTxt.replace(/[^\d]/g, '');
        browser.execute("arguments[0].click();", this.buttonAllReviews);
        return onlyNum;
    }

    clickButtonAllReviewsMobile() {
        AllureReporter.addStep('Нажатие на кнопку "Все N отзывов" в мобильной версии');
        this.buttonAllReviewsMobile.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Все N отзывов" недоступна для клика или не отображается!'
        });
        const btnTxt = this.buttonAllReviewsMobile.getText();
        const onlyNum = btnTxt.replace(/[^\d]/g, '');
        browser.execute("arguments[0].click();", this.buttonAllReviewsMobile);
        return onlyNum;
    }

    checkReviewsCountOnMainPage() {
        AllureReporter.addStep('Проверка количества отзывов в блоке на главной странице');
        const reviews = this.reviewsCollection;
        let len = reviews.length;
        assert.equal(3, len, "Количество отзывов на главной странице не равно трем или отзывы не отображаются!");
    }

    checkReviewsTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Отзывы клиентов"');
        this.reviewsBlock.scrollIntoView();
        this.reviewsTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Отзывы клиентов" не отображается!'
        });
        let title = this.reviewsTitle.getText();
        assert.equal(title, "Отзывы клиентов", "Некорректный текст заголовка 'Отзывы клиентов'!");
    }

    clickButtonMetaCategory() {
        AllureReporter.addStep('Нажатие на кнопку метакатегорий');
        const buttons = this.buttonsMetaCategoriesCollection;
        let len = buttons.length;
        let randomMeta = buttons[Math.floor(Math.random()*len)];
        randomMeta.waitForClickable({
            timeout: 15000,
            timeoutMsg: 'Кнопка метакатегории в навбаре недоступна для клика или не отображается!'
        });
        let btnTxt = randomMeta.getText();
        randomMeta.click();
        return btnTxt;
    }

    clickProductOfTheDay() {
        AllureReporter.addStep('Нажатие на случайный продукт дня');
        wdioExpect(this.productsOfTheDayCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Нет продуктов дня!'
        });
        const products = this.productsOfTheDayCollection;
        let variants = products.length;
        if (variants >= 6) variants = 6;
        const randomProduct = products[Math.floor(Math.random()*variants)];
        const productJSON = JSON.parse(randomProduct.getAttribute('data-ga-offer'));
        const productName = productJSON.name;
        randomProduct.click();
        return productName;
    }

    clickProductOfTheDayMobile() {
        AllureReporter.addStep('Нажатие на продукт дня в мобильной версии');
        wdioExpect(this.productsOfTheDayCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Нет продуктов дня!'
        });
        const products = this.productsOfTheDayCollection;
        let variant = 0;
        if (products.length >= 3) variant = 2;
        const product = products[variant];
        const productJSON = JSON.parse(product.getAttribute('data-ga-offer'));
        const productName = productJSON.name;
        browser.execute("arguments[0].click();", product);
        return productName;
    }

    checkProductOfTheDayTitle() {
        AllureReporter.addStep('Проверка заголовка блока "Товары дня" на главной странице');
        this.productOfTheDayTitle.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Заголовок блока "Товары дня" на главной странице не отображается!'
        });
    }

    checkOrderStatusTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Что с моим заказом"');
        this.orderStatusTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Что с моим заказом" не отображается!'
        });
        return this.orderStatusTitle.getAttribute('data-order-number');
    }

    clickButtonLookAtOrderInfo() {
        AllureReporter.addStep('Нажатие на кнопку просмотра информации о заказе');
        this.buttonLookAtOrderInfo.click();
    }

    //TODO: Вынесено в order status page. Проверить использование в рамках Main Page и удалить
    assertCheckOrderTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Что с моим заказом"');
        this.checkOrderTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Что с моим заказом" не отображается!'
        });
        const title = this.checkOrderTitle.getText();
        assert.equal(title, "Что с моим заказом?", "Некорректный заголовок раздела 'Что с моим заказом!");
    }

    fillOrderNumber(orderNumber) {
        AllureReporter.addStep('Ввод номера заказа');
        browser.waitUntil(
            () => this.fieldOrderNumber.isDisplayed() === true,
            {
                timeout: 10000,
                timeoutMsg: 'Поле ввода номера заказа в разделе "Что с моим заказом" не отображается!'
            }
        );
        this.fieldOrderNumber.setValue(orderNumber);
    }

    fillPhoneNumber(phoneNumber) {
        AllureReporter.addStep('Ввод номера телефона, привязанного к заказу');
        this.fieldPhoneNumber.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Поле ввода номера телефона в разделе "Что с моим заказом" не отображается!'
        });
        browser.execute(`arguments[0].value = '${phoneNumber}'`, this.fieldPhoneNumber);
    }

    clickButtonStockFromHeader() {
        AllureReporter.addStep('Нажатие на кнопку "Акции" в хэдере');
        this.buttonStockFromHeader.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Акции" в хэдере недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonStockFromHeader);
    }

    clickButtonSaleFromHeader() {
        AllureReporter.addStep('Нажатие на кнопку "Скидки" в хэдэре');
        this.buttonSaleFromHeader.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Скидки" в хэдере недоступна для клика или не отображается!'
        });
        browser.execute("arguments[0].click();", this.buttonSaleFromHeader);
    }

    checkSaleTitle() {
        AllureReporter.addStep('Проверка заголовка раздела "Скидки"');
        this.saleTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок раздела "Скидки" не отображается!'
        });
    }

    clickButtonAllArticles() {
        AllureReporter.addStep('Нажатие на кнопку "Все статьи"');
        this.buttonAllArticles.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка "Все статьи" недоступна для клика!'
        });
        this.buttonAllArticles.click();
    }

    clickArticleLink() {
        AllureReporter.addStep('Нажатие на заголовок статьи');
        const links = this.articleLinkTitlesCollection;
        const len = links.length;
        const randLink = links[Math.floor(Math.random()*len)];
        const index = links.indexOf(randLink);
        const text = this.getArticleLinkText(index);
        browser.execute("arguments[0].click();", randLink);
        return text;
    }

    getArticleLinkText(index) {
        AllureReporter.addStep('Получение текста заголовка статьи');
        wdioExpect(this.articleLinkTitlesCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Список статей пуст!'
        });
        return this.articleLinkTitlesCollection[index].getText();
    }

    clickButtonAllBrands() {
        AllureReporter.addStep('Нажатие на кнопку "Все бренды"');
        this.buttonAllBrands.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Все бренды не доступна для клика!'
        });
        this.buttonAllBrands.click();
    }

    clickStockBanner() {
        AllureReporter.addStep('Нажатие на баннер раздела "Акции"');
        this.stockBanner.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Баннер не доступен для клика!'
        });
        this.stockBanner.click();
    }

    clickButtonAllStock() {
        AllureReporter.addStep('Нажатие на кнопку "Все акции"');
        this.buttonAllStock.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Все N акций не доступна для клика!'
        });
        this.buttonAllStock.click();
    }

    clickButtonAllPartners() {
        AllureReporter.addStep('Нажатие на кнопку "Все партнеры"');
        this.buttonAllPartners.waitForClickable({
            timeout: 10000,
            timeoutMsg: 'Кнопка Все N партнеров не доступна для клика!'
        });
        this.buttonAllPartners.click();
    }

    checkPartnersTitle() {
        AllureReporter.addStep('Проверка заголовка блока "Партнеры"');
        this.partnersTitle.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Заголовок блока "Наши партнёры" не отображается!'
        });
        assert.equal(
            `${this.partnersTitle.getText()}`,
            "Наши партнёры",
            "Некорректный заголовок блока Партнеры!"
        );
    }

    checkPartnersBlock() {
        AllureReporter.addStep('Проверка видимости блока "Партнеры"');
        this.partnersBlock.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Блок "Наши партнёры" не отображается!'
        });
    }

    checkPartnersCollection() {
        AllureReporter.addStep('Проверка наличия партнеров в карусели блока "Партнеры"');
        wdioExpect(this.partnersCollection).toBeElementsArrayOfSize({
            gte: 1,
            message: 'Не отображается ни одного партнера в карусели!'
        });
    }

    checkSubscribeHeader() {
        AllureReporter.addStep('Проверка заголовка блока подписки');
        this.subscribeHeader.waitForDisplayed({
            timeoutMsg: 'Блок подписки не отображается!'
        });
        this.subscribeHeader.scrollIntoView(false);
        assert.equal(
            `${this.subscribeHeader.getText()}`,
            "Выгодные предложения для подписчиков",
            "Некорректный заголовок блока подписки на рассылку!"
        );
    }

    checkEmailSubscribeInputNotEmpty() {
        AllureReporter.addStep('Проверка автоматического заполнения поля электронной почты в разделе подписки для авторизованного пользователя');
        this.fieldEmailForSubscribe.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Поле электронной почты в разделе подписки не отображается!'
        });
        assert.isNotEmpty(
            `${this.fieldEmailForSubscribe.getAttribute('value')}`,
            'Поле электронной почты в разделе подписки не заполнено автоматически для авторизованного пользователя!'
        );
    }

    clearFieldEmailForSubscribe() {
        AllureReporter.addStep('Очистка поля ввода электронной почты для подписки на рассылку');
        this.fieldEmailForSubscribe.clearValue();
    }

    clickButtonSubscribe() {
        AllureReporter.addStep('Нажатие на кнопку "Подписаться"');
        this.buttonSubscribe.waitForClickable({
            timeout: 7000,
            timeoutMsg: 'Кнопка "Подписаться" недоступна для клика!'
        });
        this.buttonSubscribe.click();
    }

    checkSubscribeSuccessfulHeader() {
        AllureReporter.addStep('Проверка заголовка уведомления об успешной подписке на рассылку');
        this.subscribeSuccessfulHeader.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Не отображается сообщения об успешной отправке письма!'
        });
        assert.equal(
            `${this.subscribeSuccessfulHeader.getText()}`,
            "Вы успешно подписались на рассылку",
            "Некорректный текст сообщения об успешной отправке письма!"
        );
    }

    checkSubscribeAlert() {
        AllureReporter.addStep('Проверка предупреждения о необходимости заполнить поле электронной почты для подписки на рассылку');
        this.subscribeAlert.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Не отображается предупреждение о необходимости заполнить поле EMail!'
        });
        assert.equal(
            `${this.subscribeAlert.getText()}`,
            "Укажите адрес электронной почты",
            "Некорректный текст предупреждения о необходимости заполнить поле EMail!"
        );
    }
    checkBannerBlock() {
        AllureReporter.addStep('Проверка отображения блока с баннерами');
        this.bannersBlock.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Блок с баннерами не отображается!'
        });
        wdioExpect(this.bannersBlockLinks).toBeElementsArrayOfSize({
            gte: 1,
            message: 'В блоке баннеров нет ссылок на продукты!',
            wait: 3000
        });
        let links = [];
        this.bannersBlockLinks.forEach(link => links.push(link.getAttribute('href')));
        return links;
    }

    checkBrandsBlock() {
        AllureReporter.addStep('Проверка блока "Бренды" на главной странице');
        this.brands.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Раздел "Бренды" не отображается!'
        });
        wdioExpect(this.brands).toHaveTextContaining(
            'Популярные бренды',
            {message: 'Не отображается заголовок "Популярные бренды"!'}
        );
    }

    checkBrandsBlockTabs() {
        AllureReporter.addStep('Проверка вкладок в блоке "Бренды" на главной странице');
        const tabs = ['Красота', 'Здоровье', 'Гигиена', 'Для детей', 'Медицинские товары'];
        tabs.forEach(tab => {
            wdioExpect(this.brandsTab(tab)).toBeClickable({
                message: `Раздел "${tab}" не отображается или не доступен для клика!`
            });
            this.brandsTab(tab).click();
            wdioExpect(this.brandsTab(tab)).toHaveAttrContaining(
                'class',
                'is-active',
                {message: `Раздел "${tab}" не активен!`}
            );
            let dataId = this.brandsTab(tab).getAttribute('data-id');
            let brands = this.brandsTabList(dataId);
            wdioExpect(brands).toBeElementsArrayOfSize({
                gte: 1,
                message: `Нет брендов в разделе "${tab}"!`
            });
            let randomBrand = brands[Math.floor(Math.random()*brands.length)];
            let bradName = this.brandsTabListImg(dataId)[brands.indexOf(randomBrand)].getAttribute('alt');
            randomBrand.click();
            brandsPage.checkBrandSearchResultsTitle();
            brandsPage.checkBrandTitleText(bradName);
            browser.back();
        });
    }
}

module.exports = new MainPage();