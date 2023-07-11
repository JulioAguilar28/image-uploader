'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
    }
  }
  Images.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Images'
    }
  )
  return Images
}
