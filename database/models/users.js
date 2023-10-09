const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(72),
      allowNull: true
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users_category',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "id_category",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });
};
