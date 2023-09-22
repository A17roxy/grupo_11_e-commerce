const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoices_products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_invoice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'invoices_products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_invoice",
        using: "BTREE",
        fields: [
          { name: "id_invoice" },
        ]
      },
    ]
  });
};
