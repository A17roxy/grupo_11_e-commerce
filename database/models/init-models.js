var DataTypes = require("sequelize").DataTypes;
var _carts = require("./carts");
var _genres = require("./genres");
var _invoices = require("./invoices");
var _invoices_products = require("./invoices_products");
var _products = require("./products");
var _users = require("./users");
var _users_category = require("./users_category");

function initModels(sequelize) {
  var carts = _carts(sequelize, DataTypes);
  var genres = _genres(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var invoices_products = _invoices_products(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_category = _users_category(sequelize, DataTypes);

  products.belongsTo(genres, { as: "id_genre_genre", foreignKey: "id_genre"});
  genres.hasMany(products, { as: "products", foreignKey: "id_genre"});
  invoices_products.belongsTo(invoices, { as: "id_invoice_invoice", foreignKey: "id_invoice"});
  invoices.hasMany(invoices_products, { as: "invoices_products", foreignKey: "id_invoice"});
  carts.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(carts, { as: "carts", foreignKey: "id_product"});
  carts.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(carts, { as: "carts", foreignKey: "id_user"});
  invoices.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(invoices, { as: "invoices", foreignKey: "id_user"});
  users.belongsTo(users_category, { as: "id_category_users_category", foreignKey: "id_category"});
  users_category.hasMany(users, { as: "users", foreignKey: "id_category"});

  return {
    carts,
    genres,
    invoices,
    invoices_products,
    products,
    users,
    users_category,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
