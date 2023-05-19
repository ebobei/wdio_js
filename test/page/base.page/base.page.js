const Cart = require('./cart.page');
const Footer = require('./footer.page');
const Core = require('./core.page');
const Search = require('./search.page');
const Header = require('./header.page');
const ChangeCity = require('./change.city.page');
const Auth = require('./auth.page');
const ProductCategories = require('./product.categories.page');
const ViewedAndFavorites = require('./viewed.favorites.page');

const basePage = {
    cart: Cart,
    footer: Footer,
    core: Core,
    search: Search,
    header: Header,
    changeCity: ChangeCity,
    auth: Auth,
    productCategories: ProductCategories,
    viewedAndFavorites: ViewedAndFavorites
};

module.exports = basePage;