const mainPage = require("../../../../page/main.page/main.page");
const companyPage = require("../../../../page/company.page");
const drugsCatalogPage = require("../../../../page/catalogs/drugs.catalog.page");
const beautyCatalogPage = require("../../../../page/catalogs/beauty.catalog.page");
const lensesCatalogPage = require("../../../../page/catalogs/lenses.catalog.page");
const medicalCatalogPage = require("../../../../page/catalogs/medical.catalog.page");
const motherCatalogPage = require("../../../../page/catalogs/mother.catalog.page");
const orthopedicCatalogPage = require("../../../../page/catalogs/orthopedic.catalog.page");
const careerPage = require("../../../../page/career.page");
const appstorePage = require("../../../../page/store.pages/appstore.page");
const hygieneCatalogPage = require("../../../../page/catalogs/hygiene.catalog.page");
const zooCatalogPage = require("../../../../page/catalogs/zoo.catalog.page");
const goodsPage = require("../../../../page/goods.page/goods.page");
const { assert } = require("chai");
const metaPage = require("../../../../page/meta.page");
const reviewsPage = require("../../../../page/reviews.page");
const wowPage = require("../../../../page/wow.page");
const basePage = require("../../../../page/base.page/base.page");
const pickupPage = require("../../../../page/pickup.page");
const ENV = process.env.ENV;
require('dotenv').config();

describe("Прокрутка на главной странице", function () {
  this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
    browser.deleteAllCookies();
    browser.execute("window.localStorage.clear()");
    browser.url("/");
  });

  it('Кнопка "Наверх" работает на всех устройствах', function () {
    basePage.footer.scrollToFooter();
    basePage.core.tryToCloseNotifications();
    basePage.core.clickButtonScrollToTop();
    basePage.search.checkSearchFieldIsVisible();
  });
});

describe("Проверка кнопок хэдера", function () {
  this.retries(process.env.RETRIES);
  before("Подготовка окружения", function () {
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.deleteAllCookies();
    browser.execute("window.localStorage.clear()");
    browser.url("/");
  });

  it("Сменить регион типы регионов", function () {
    const city = "Санкт-Петербург";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
  });

  it("Доставка 24/7", function () {
    let city = "Санкт-Петербург";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
    basePage.header.assertSpbDeliveryLink();
    city = "Москва";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
    basePage.header.assertMoscowDeliveryLink();
    city = "Тверь";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
    basePage.header.assertTverDeliveryLink();
  });

  it("Самовывоз из N аптек", function () {
    basePage.header.clickButtonPharmaciesForPickup();
    pickupPage.checkPickupTitle();
    const countFromButton =
      basePage.header.getCountFromButtonPharmaciesForPickup();
    const countOfPharmacies = pickupPage.getCountOfPharmaciesForPickup();
    assert.equal(
      `${countFromButton}`,
      `${countOfPharmacies}`,
      "Количество аптек и число в кнопке 'Самовывоз из N аптек' различаются!"
    );
  });

  it("Проверить отображение номеров телефонов", function () {
    basePage.core.checkPhoneForUsers();
  });

  it("Карьера", function () {
    basePage.header.checkButtonCareer();
    if (ENV === "prod") {
      basePage.header.buttonCareer.click();
      careerPage.checkVacancyTitles();
      careerPage.checkVacanciesList();
      browser.url("/");
    }
    basePage.footer.checkButtonCareer();
    if (ENV === "prod") {
      basePage.footer.buttonCareer.click();
      careerPage.checkVacancyTitles();
      careerPage.checkVacanciesList();
    }
  });
});

describe("Проверка кнопок футера", function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
    basePage.core.tryToCloseNotifications();
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Написать обращение в Обратную связь", function () {
    basePage.footer.clickButtonFeedback();
    companyPage.checkFeedBackTitle();
    companyPage.fillFeedbackForm();
    companyPage.clickButtonSendFeedback();
    companyPage.checkSuccessMessage();
  });

  it("Политика конфиденциальности", function () {
    basePage.footer.clickButtonPolicy();
    companyPage.checkPolicyTitle();
  });

  it.skip("О компании", function () {
    const addressInMainPage = basePage.footer.getCompanyAddress();
    basePage.footer.clickButtonAboutCompany();
    companyPage.checkAboutCompanyTitle();
    const addressInCompanyPage = companyPage.getAboutCompanyInfo();
    assert.include(
      addressInCompanyPage,
      addressInMainPage,
      "Адрес с главной страницы не содержится на странице 'О компании'!"
    );
  });

  it("Пользовательское соглашение", function () {
    basePage.footer.clickButtonContract();
    companyPage.checkContractTitle();
  });

  it("Доставка", function () {
    basePage.footer.clickButtonDelivery();
    companyPage.checkDeliveryTitle();
  });

  it("Самовывоз", function () {
    basePage.footer.clickButtonPickup();
    companyPage.checkPickupTitle();
  });

  it("Оплата", function () {
    basePage.footer.clickButtonPayment();
    companyPage.checkPaymentTitle();
    companyPage.checkCashPayment();
    companyPage.clickButtonCardPayment();
    companyPage.checkCardPayment();
  });

  it("Юридическим лицам", function () {
    basePage.footer.clickButtonEntity();
    companyPage.checkWholesaleTitle();
    companyPage.checkCorporateContactBlock();
    companyPage.clickButtonRecall();
    companyPage.fillRecallForm();
    companyPage.clickButtonSubmitRecall();
    companyPage.checkRecallConfirmedTitle();
  });

  it("Поставщики", function () {
    basePage.footer.clickButtonOurSupplier();
    companyPage.checkOurSuppliersTitle();
    companyPage.checkSuppliersList();
  });

  it("Большой ассортимент", function () {
    basePage.footer.clickButtonGoods();
    drugsCatalogPage.checkDrugsCatalogTitle();
    browser.url("/");
    basePage.footer.clickButtonBeautyAndHygiene();
    beautyCatalogPage.checkBeautyCatalogTitle();
    browser.url("/");
    basePage.footer.clickButtonLenses();
    lensesCatalogPage.checkLensesCatalogTitle();
    browser.url("/");
    basePage.footer.clickButtonMotherAndKids();
    motherCatalogPage.checkMotherAndKidsCatalogTitle();
    browser.url("/");
    basePage.footer.clickButtonMedical();
    medicalCatalogPage.checkMedicalCatalogTitle();
    browser.url("/");
    basePage.footer.clickButtonOrthopedicProducts();
    orthopedicCatalogPage.checkOrthopedicCatalogTitle();
  });

  it("Проверить отображение номеров телефонов", function () {
    basePage.footer.checkPhoneNumbersInFooter();
  });

  it("Реклама на сайте", function () {
    basePage.footer.clickButtonAds();
    companyPage.checkAdsTitle();
  });

  it("Проверить кнопки с приложениями", function () {
    basePage.footer.clickButtonAppStore();
    appstorePage.checkAppStoreTitle();
    browser.closeWindow();
    browser.switchWindow("/");
    basePage.footer.clickButtonGooglePlay();
    googleplayPage.checkGooglePlayTitle();
    browser.closeWindow();
    browser.switchWindow("/");
  });

  it("Проверить ссылки на соцсети", function () {
    basePage.footer.checkButtonFacebook();
    basePage.footer.checkButtonVK();
    basePage.footer.checkButtonTG();
    basePage.footer.checkButtonOK();
    basePage.footer.checkButtonZEN();
    basePage.core.tryToCloseNotifications();
    basePage.core.clickButtonScrollToTop();
  });
});

describe("Проверка навбара", function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
    browser.deleteAllCookies();
    browser.execute("window.localStorage.clear()");
    browser.refresh();
    basePage.changeCity.clickButtonConfirmCurrentCity();
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Проверить переход по группам товаров", function () {
    basePage.productCategories.clickFirstCategoryInNavBar();
    drugsCatalogPage.checkDrugsCatalogTitle();
    basePage.productCategories.clickButtonBeautyInNavbar();
    beautyCatalogPage.checkBeautyCatalogTitle();
    basePage.productCategories.clickButtonHygieneInNavbar();
    hygieneCatalogPage.checkHygieneCatalogTitle();
    basePage.productCategories.clickButtonLensesInNavbar();
    lensesCatalogPage.checkLensesCatalogTitle();
    basePage.productCategories.clickButtonMotherAndKidsInNavbar();
    motherCatalogPage.checkMotherAndKidsCatalogTitle();
    basePage.productCategories.clickButtonMedicalInNavbar();
    medicalCatalogPage.checkMedicalCatalogTitle();
    basePage.productCategories.clickButtonZooInNavbar();
    zooCatalogPage.checkZooCatalogTitle();
  });

  it("Проверить переход по метакатегориям товаров", function () {
    mainPage.clickButtonMetaCategory();
    metaPage.checkMetaPageTitle();
    let metaButtonText = mainPage.clickButtonMetaCategory();
    let metaTitleText = metaPage.checkMetaPageTitle();
    assert.equal(
      metaButtonText,
      metaTitleText,
      "Текст в кнопке метакатегории отличается от текста в заголовке раздела метакатегории, в которую был осуществлен переход"
    );
  });
});

describe('Проверка блока "Товары дня"', function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Товар дня", function () {
    mainPage.checkProductOfTheDayTitle();
    const productName = mainPage.clickProductOfTheDay();
    const nameInProductCard = goodsPage.productDetail.getGoodsName();
    assert.equal(
      productName,
      nameInProductCard,
      "Наименование товара в разделе 'Товары дня' отличается от наименования товара в КТ!"
    );
  });
});

describe('Проверка блока "Отзывы клиентов"', function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Проверить отображение отзывов клиентов", function () {
    mainPage.checkReviewsTitle();
    mainPage.checkReviewsCountOnMainPage();
    let expectedCountOfReviews = mainPage.clickButtonAllReviews();
    reviewsPage.selectCheckboxProperty();
    reviewsPage.checkReviewsTitle();
    let actualCountOfReviews = reviewsPage.getActualCountOfReviews();
    assert.equal(
      expectedCountOfReviews,
      actualCountOfReviews,
      "Фактическое количество отзывов отличается от количества в счетчике кнопки 'Все N отзывов'!"
    );
    browser.url("/");
    mainPage.checkReviewsTitle();
    mainPage.clickButtonAllReviews();
    reviewsPage.checkReviewsTitle();
    reviewsPage.checkRatingFilter();
  });

  it("Написать отзыв", function () {
    mainPage.clickButtonAddReview();
    reviewsPage.closeReviewForm();
    reviewsPage.clickButtonAddReview();
    reviewsPage.setRating();
    reviewsPage.fillReviewForm();
    reviewsPage.clickButtonSendReview();
    reviewsPage.checkSuccessfulReviewSendingMessage();
  });
});

describe("Проверка блока Wow-скидки", function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Оформление блока WOW скидки", function () {
    mainPage.checkWowSaleBanner();
    wowPage.checkProductsListAtWowSale();
    wowPage.checkWowProgressCounter();
   });
});

describe("Проверка баннеров", function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
  });

  it("Баннеры", function () {
    let city = "Москва";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
    const moscowLinks = mainPage.checkBannerBlock();
    city = "Тверь";
    basePage.changeCity.changeCityTo(city);
    basePage.header.checkCityChange(city);
    const tverLinks = mainPage.checkBannerBlock();
    assert.notSameOrderedMembers(
      moscowLinks,
      tverLinks,
      "Одинаковые баннеры в Москве и Твери!"
    );
  });
});

describe("Проверка блока брендов", function () {
 this.retries(process.env.RETRIES);

  before("Подготовка окружения", function () {
    browser.url("/");
    browser.deleteAllCookies();
    browser.execute("window.localStorage.clear()");
    browser.url("/");
  });

  afterEach("Возврат на главную страницу", function () {
    browser.url("/");
    browser.deleteAllCookies();
    browser.execute("window.localStorage.clear()");
    browser.url("/");
  });

  it("Бренды", function () {
    mainPage.checkBrandsBlock();
    mainPage.checkBrandsBlockTabs();
  });
});
