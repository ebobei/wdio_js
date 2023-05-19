const GoodsPageProductDetail = require('./goods.page.product.detail');
const GoodsPageAlsoBuy = require('./goods.page.also.buy');
const GoodsPageAnalogs = require('./goods.page.analogs');
const GoodsPageArticle = require('./goods.page.article');
const GoodsPageBreadcrumbs = require('./goods.page.breadcrumbs');
const GoodsPageBundle = require('./goods.page.bundle');
const GoodsPageCertificates = require('./goods.page.certificates');
const GoodsPageDelivery = require('./goods.page.delivery');
const GoodsPageForms = require('./goods.page.forms');
const GoodsPageInstruction = require('./goods.page.instruction');
const GoodsPagePickup = require('./goods.page.pickup');
const GoodsPageReview = require('./goods.page.review');
const GoodsPageStock = require('./goods.page.stock');
const GoodsPageLoyalty = require('./goods.page.loyalty');

const goodsPage = {
    productDetail: GoodsPageProductDetail,
    alsoBuy: GoodsPageAlsoBuy,
    analogs: GoodsPageAnalogs,
    articles: GoodsPageArticle,
    breadcrumbs: GoodsPageBreadcrumbs,
    bundle: GoodsPageBundle,
    certificates: GoodsPageCertificates,
    delivery: GoodsPageDelivery,
    forms: GoodsPageForms,
    instruction: GoodsPageInstruction,
    pickup: GoodsPagePickup,
    reviews: GoodsPageReview,
    stock: GoodsPageStock,
    loyalty: GoodsPageLoyalty
};

module.exports = goodsPage;