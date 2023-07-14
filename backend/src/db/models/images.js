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
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image name cannot be null or empty'
          }
        }
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image extension cannot be null or empty'
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image User Id cannot be null or empty'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Images'
    }
  )
  return Images
}
