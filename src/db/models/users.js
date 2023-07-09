'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async login({ email, password }) {
      try {
        const user = await this.findOne({
          where: { email }
        })

        if (user) {
          return await user.validatePassword(password)
        } else false
      } catch (error) {
        console.error(`login() | error: ${error}`)
        throw new Error(error)
      }
    }

    async validatePassword(password) {
      try {
        return await bcrypt.compare(password, this.passwordHash)
      } catch (error) {
        console.error(`Users.validateError() | error: ${error}`)
        throw new Error(error)
      }
    }
  }

  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      passwordHash: DataTypes.STRING,
      password: DataTypes.VIRTUAL
    },
    {
      sequelize,
      modelName: 'Users'
    }
  )

  Users.beforeCreate(async (model, _options) => {
    try {
      const hash = await bcrypt.hash(model.password, 10)
      model.passwordHash = hash
    } catch (error) {
      console.log(`Users.beforeCreate() | error: ${error}`)
      throw new Error(error)
    }
  })

  return Users
}
