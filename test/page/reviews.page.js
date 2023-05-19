const chai = require("chai"),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();
const { default: AllureReporter } = require("@wdio/allure-reporter");

class ReviewsPage {
  get reviewsTitle() {
    return $('//h1[@class="sec-inner__title"]');
  }

  get reviewsCollection() {
    return $$('//div[contains(@id, "box-review")]');
  }

  get paginationButtonsCollection() {
    return $$(
      '//div[@class="sec-categories__navigation left"]//li//a[contains(@href, "/company/reviews_site/")]'
    );
  }

  get loader() {
    return $('//div[@class="waitwindowlocalshadow"]');
  }

  get reviewsCounterUnderTitle() {
    return $('//div[@class="sec-mentions__subtitle-comment"]');
  }

  get reviewsCounterUnderRating() {
    return $('//div[@class="sec-mentions__side-comment"]');
  }

  get ratingFiltersCollection() {
    return $$(
      '//div[@id="reviewsFilter"]//label[contains(@for, "")]//a[contains(., "отзыв")]'
    );
  }

  get buttonNextInPagination() {
    return $('//a[@rel="next"]');
  }

  get checkedReviewFilter() {
    return $(
      '//div[@id="reviewsFilter"]//input[@type="checkbox" and @checked]'
    );
  }

  get ratingCollection() {
    return $$(
      '//div[@class="sec-mentions__item-rating"]//div[contains(@class, "rating s")]'
    );
  }

  get buttonOpenFilter() {
    return $('//a[@class="filter__opener"]');
  }

  get ratingMobileFiltersCollection() {
    return $$(
      '//div[@class="filter sec-categories__sidebar xs-shown"]//label[contains(@for, "")]//a[contains(., "отзыв")]'
    );
  }

  get filtersMobileBlock() {
    return $('//div[@class="filter sec-categories__sidebar xs-shown"]');
  }

  get buttonCloseReviewForm() {
    return $('//div[@id="reviews-form"]//a[contains(@class, "close")]');
  }

  get buttonAddReview() {
    return $('//a[@data-action="showReviewPopup"]');
  }

  get reviewForm() {
    return $('//div[@id="reviews-form"]//div[@id="Mention"]');
  }

  get reviewStarsCollection() {
    return $$('//div[@id="Mention"]//div[contains(@class, "rating")]//i');
  }

  get inputOrderNumber() {
    return $('//input[@name="order_id"]');
  }

  get inputAdvantages() {
    return $('//textarea[@name="advantages"]');
  }

  get inputDisadvantages() {
    return $('//textarea[@name="disadvantages"]');
  }

  get inputComment() {
    return $('//textarea[@name="comment"]');
  }

  get inputName() {
    return $('//input[@name="name"]');
  }

  get inputContact() {
    return $('//input[@name="client_contact"]');
  }

  get buttonSendReview() {
    return $('//button[.="Отправить отзыв"]');
  }

  get successfulReviewSendingInfo() {
    return $('//div[@id="MentionSuccess"]');
  }

  get propertyRatingCheckBox5() {
    return $('//*[@id="reviewsFilter"]/div[2]/div[2]/label/i');
  }

  get propertyRatingCheckBox4() {
    return $('//*[@id="reviewsFilter"]/div[2]/div[3]/label/i');
  }

  get propertyRatingCheckBox3() {
    return $('//*[@id="reviewsFilter"]/div[2]/div[4]/label/i');
  }

  get propertyRatingCheckBox2() {
    return $('//*[@id="reviewsFilter"]/div[2]/div[5]/label/i');
  }

  get propertyRatingCheckBox1() {
    return $('//*[@id="reviewsFilter"]/div[2]/div[6]/label/i');
  }

  checkSuccessfulReviewSendingMessage() {
    AllureReporter.addStep(
      "Проверка появляения сообщения об успешной отправке отзыва!"
    );
    this.successfulReviewSendingInfo.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Сообщение об успешной отправке отзыва не отображается!",
    });
    this.closeReviewForm();
  }

  clickButtonSendReview() {
    AllureReporter.addStep("Нажатие на кнопку отправки отзыва");
    this.buttonSendReview.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Кнопка отправки отзыва недоступна для клика!",
    });
    this.buttonSendReview.click();
    this.reviewForm.waitForDisplayed({
      timeout: 5000,
      timeoutMsg:
        'Форма отзыва не закрыта после нажатия кнопку "Отправить отзыв"!',
      reverse: true,
    });
  }

  fillReviewForm() {
    AllureReporter.addStep("Заполнение формы отзыва");
    this.inputOrderNumber.setValue("666");
    this.inputAdvantages.setValue("ТЕСТОВЫЙ ОТЗЫВ");
    this.inputDisadvantages.setValue("ОТЗЫВ НАПИСАН АВТОМАТИЧЕСКИМ ТЕСТОМ");
    this.inputComment.setValue("ЗВЕЗДЫ ВЫСТАВЛЯЮТСЯ РАНДОМНО");
    this.inputName.setValue("Тест тест тест");
    this.inputContact.setValue("mail@mail.mail");
  }

  setRating() {
    AllureReporter.addStep("Выставление звезд в рейтинге");
    const stars = this.reviewStarsCollection;
    const randStar =
      stars[Math.floor(Math.random() * this.reviewStarsCollection.length)];
    randStar.waitForClickable({
      timeout: 5000,
      timeoutMsg: `Кнопка ${stars.indexOf(
        randStar
      )}-й звезды недоступна для клика!`,
    });
    randStar.click();
  }

  clickButtonAddReview() {
    AllureReporter.addStep('Нажатие на кнопку "Написать отзыв"');
    this.buttonAddReview.scrollIntoView();
    this.buttonAddReview.waitForClickable({
      timeout: 10000,
      timeoutMsg: 'Кнопка "Написать отзыв" недоступна для клика!',
    });
    this.buttonAddReview.click();
    this.reviewForm.waitForDisplayed({
      timeout: 5000,
      timeoutMsg:
        'Форма отзыва не открыта после нажатия кнопку "Написать отзыв"!',
    });
  }

  closeReviewForm() {
    AllureReporter.addStep("Закрытие формы написания отзыва");
    this.buttonCloseReviewForm.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Кнопка закрытия формы написания отзыва недоступна для клика!",
    });
    this.buttonCloseReviewForm.click();
    this.reviewForm.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: 'Форма отзыва не закрыта после нажатия кнопку "Закрыть"!',
      reverse: true,
    });
  }

  checkMobileRatingFilter() {
    AllureReporter.addStep(
      "Выставление фильтра на странице рейтинга в мобильной версии сайта"
    );
    const filters = this.ratingMobileFiltersCollection;
    let len = filters.length;
    let randFilter = filters[Math.floor(Math.random() * len)];
    randFilter.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Фильтр по количеству звезд в разделе отзывов не отображается или недоступен для клика!",
    });
    let countOfReviewsFromFilter = randFilter.getText().replace(/[^\d]/g, "");
    let expectedCountOfReviewsOnLastPage = countOfReviewsFromFilter % 15;
    browser.execute("arguments[0].click();", randFilter);
    this.waitUntilLoaderNotDisplayed();

    let pagination = this.paginationButtonsCollection;
    const lastPagination = pagination[pagination.length - 1];
    lastPagination.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Последняя страница пагинации отзывов не отображается или недоступен для клика!",
    });
    browser.execute("arguments[0].click();", lastPagination);

    this.waitUntilLoaderNotDisplayed();
    let countOfReviewsOnLastPage = this.reviewsCollection.length;

    assert.equal(
      expectedCountOfReviewsOnLastPage,
      countOfReviewsOnLastPage,
      "Некорректное количество отзывов на последней странице, в счетчике фильтра указана неверная сумма отзывов для данного рейтинга!"
    );
  }

  clickButtonOpenFilter() {
    AllureReporter.addStep(
      "Нажатие на кнопку открытия фильтра в мобильной версии сайта"
    );
    this.buttonOpenFilter.waitForClickable({
      timeout: 15000,
      timeoutMsg:
        "Кнопка открытия фильтра в мобильной версии сайта недоступна для клика!",
    });
    this.buttonOpenFilter.click();
    this.filtersMobileBlock.waitForDisplayed({
      timeout: 15000,
      timeoutMsg:
        "Блок фильтров в мобильной версии сайта не отображается после нажатия на кнопку фильтра!",
    });
  }

  checkRatingInPagination() {
    AllureReporter.addStep(
      "Проверка корректного отображения рейтинга на всех страницах с отзывами"
    );
    const filters = this.ratingFiltersCollection;
    let len = filters.length;
    let randFilter = filters[Math.floor(Math.random() * len)];
    randFilter.waitForClickable({
      timeout: 15000,
      timeoutMsg:
        "Фильтр по количеству звезд в разделе отзывов не отображается или недоступен для клика!",
    });
    browser.execute("arguments[0].click();", randFilter);
    this.waitUntilLoaderNotDisplayed();

    let pagBtns = this.paginationButtonsCollection;
    let pagLen = pagBtns.length;
    let lastPgnTxt = pagBtns[pagLen - 1].getText();
    let countOfStars = this.checkedReviewFilter.getAttribute("value");
    let ratings = this.ratingCollection;

    for (let i = 0; i < lastPgnTxt; i++) {
      ratings.forEach((rating) => {
        let starsInReview = rating.getAttribute("class");
        assert.include(
          starsInReview,
          countOfStars,
          `На странице присутствует отзыв с рейтингом, отличным от фильтра!`
        );
        this.buttonNextInPagination.waitForClickable({
          timeout: 10000,
          timeoutMsg:
            "Кнопка следующей страницы пагинации в разделе отзывов не отображается или недоступна для клика!",
        });
        browser.execute("arguments[0].click();", this.buttonNextInPagination);
        this.waitUntilLoaderNotDisplayed();
      });
    }
  }

  checkRatingFilter() {
    AllureReporter.addStep("Выставление фильтра на странице рейтинга");
    const filters = this.ratingFiltersCollection;
    let len = filters.length;
    let randFilter = filters[Math.floor(Math.random() * len)];
    randFilter.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Фильтр по количеству звезд в разделе отзывов не отображается или недоступен для клика!",
    });
    let countOfReviewsFromFilter = randFilter.getText().replace(/[^\d]/g, "");
    let expectedCountOfReviewsOnLastPage = countOfReviewsFromFilter % 15;
    browser.execute("arguments[0].click();", randFilter);
    this.waitUntilLoaderNotDisplayed();

    let pagination = this.paginationButtonsCollection;
    const lastPagination = pagination[pagination.length - 1];
    lastPagination.waitForClickable({
      timeout: 10000,
      timeoutMsg:
        "Последняя страница пагинации отзывов не отображается или недоступен для клика!",
    });
    browser.execute("arguments[0].click();", lastPagination);

    this.waitUntilLoaderNotDisplayed();
    let countOfReviewsOnLastPage = this.reviewsCollection.length;

    assert.equal(
      expectedCountOfReviewsOnLastPage,
      countOfReviewsOnLastPage,
      "Некорректное количество отзывов на последней странице, в счетчике фильтра указана неверная сумма отзывов для данного рейтинга!"
    );
  }

  getValueFromCounterUnderTitle() {
    AllureReporter.addStep(
      "Получение значения счетчика отзывов под заголовком"
    );
    this.reviewsCounterUnderTitle.waitForDisplayed({
      timeout: 7000,
      timeoutMsg: "Счетчик отзывов под заголовком не отображается!",
    });
    let countUnderTitleValue = this.reviewsCounterUnderTitle.getText();
    let cleanCountRae = countUnderTitleValue.replace(/[^+\d]/g, "");
    return cleanCountRae;
  }

  getValueFromCounterUnderRating() {
    AllureReporter.addStep(
      "Получение значения счетчика отзывов под рейтингом аптеки"
    );
    this.reviewsCounterUnderRating.waitForDisplayed({
      timeout: 7000,
      timeoutMsg: "Счетчик отзывов под рейтингом аптеки не отображается!",
    });
    let countUnderRatingValue = this.reviewsCounterUnderRating.getText();
    let cleanCount = countUnderRatingValue.replace(/[^+\d]/g, "");
    return cleanCount;
  }

  getActualCountOfReviews() {
    AllureReporter.addStep("Получение фактического количества отзывов");
    const reviews = this.reviewsCollection;
    const countOfReviewsOnFirstPage = reviews.length;
    const countUnderRating = this.getValueFromCounterUnderRating();
    const countUnderTitle = this.getValueFromCounterUnderTitle();

    let pagination = this.paginationButtonsCollection;
    let len = pagination.length;
    let lastPagination = pagination[len - 1];

    let lastPgnBtnNum = lastPagination.getText();
    browser.execute("arguments[0].click();", lastPagination);
    this.waitUntilLoaderNotDisplayed();

    let reviewsOnLastPage = this.reviewsCollection;
    let countOfReviewsOnLastPage = reviewsOnLastPage.length;

    let sum =
      countOfReviewsOnFirstPage * (lastPgnBtnNum - 1) +
      countOfReviewsOnLastPage;
    assert.equal(
      countUnderRating,
      countUnderTitle,
      "Количество отзывов в счетчиках под заголовком и под рейтингом аптеки различается!"
    );
    assert.equal(
      countUnderTitle,
      sum,
      "Количество сообщений в счетчиках на странице отзывов не совпадаетс с реальным количеством отзывов!"
    );
    return sum;
  }

  getActualCountOfReviewsOnMobile() {
    AllureReporter.addStep(
      "Получение фактического количества отзывов на мобильной версии сайта"
    );
    const reviews = this.reviewsCollection;
    const countOfReviewsOnFirstPage = reviews.length;
    const countUnderTitle = this.getValueFromCounterUnderTitle();

    let pagination = this.paginationButtonsCollection;
    let len = pagination.length;
    let lastPagination = pagination[len - 1];

    let lastPgnBtnNum = lastPagination.getText();
    browser.execute("arguments[0].click();", lastPagination);
    this.waitUntilLoaderNotDisplayed();

    let reviewsOnLastPage = this.reviewsCollection;
    let countOfReviewsOnLastPage = reviewsOnLastPage.length;

    let sum =
      countOfReviewsOnFirstPage * (lastPgnBtnNum - 1) +
      countOfReviewsOnLastPage;
    assert.equal(
      countUnderTitle,
      sum,
      "Количество сообщений в счетчиках на странице отзывов не совпадаетс с реальным количеством отзывов!"
    );
    return sum;
  }

  waitUntilLoaderNotDisplayed() {
    AllureReporter.addStep("Ожидание изчезновения лоадера");
    try {
      browser.waitUntil(() => this.loader.isDisplayed() === true, {
        timeout: 5000,
        timeoutMsg: "Лоадер не отображается",
      });
    } catch (error) {}
    browser.waitUntil(() => this.loader.isDisplayed() === false, {
      timeout: 5000,
      timeoutMsg: "Слишком долгая загрузка",
    });
  }

  checkReviewsTitle() {
    AllureReporter.addStep(
      'Проверка заголовка на странице "Отзывы о работе интернет-аптеки"'
    );
    this.reviewsTitle.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Заголовок раздела отзывов не отображается!",
    });
    const title = this.reviewsTitle.getText();
    assert.include(
      title,
      "Отзывы о работе интернет-аптеки",
      "Некорректный заголовок раздела отзывов!"
    );
  }

  selectCheckboxProperty() {
    AllureReporter.addStep("Чекбоксы рейтинга отзывов клиентов");
    this.propertyRatingCheckBox5.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс 5 звезд рейтинга отзывов клиентов не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.propertyRatingCheckBox5);

    this.propertyRatingCheckBox4.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс 4 звезды рейтинга отзывов клиентов не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.propertyRatingCheckBox4);

    this.propertyRatingCheckBox3.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс 3 звезды рейтинга отзывов клиентов не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.propertyRatingCheckBox3);

    this.propertyRatingCheckBox2.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс 2 звезды рейтинга отзывов клиентов не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.propertyRatingCheckBox2);
    this.propertyRatingCheckBox1.waitForClickable({
      timeout: 5000,
      timeoutMsg: "Чек-бокс 1 звезда рейтинга отзывов клиентов не кликабелен!",
    });
    browser.execute("arguments[0].click();", this.propertyRatingCheckBox1);
  }
}

module.exports = new ReviewsPage();
