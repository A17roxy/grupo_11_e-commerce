const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carts', {
    id_user: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'carts',
    timestamps: false,
    indexes: [
      {
        name: "id_product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "id_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
