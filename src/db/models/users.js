'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const { AuthError } = require('../../auth/errors')

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
        if (!email || !password) throw AuthError.of('email and password are required')

        const user = await this.findOne({
          where: { email }
        })

        if (user) {
          return (await user.validatePassword(password)) ? user : null
        } else null
      } catch (error) {
        console.error(`Users.login() | ${error}`)
        throw error
      }
    }

    async validatePassword(password) {
      try {
        return await bcrypt.compare(password, this.passwordHash)
      } catch (error) {
        console.error(`Users.validatePassword() | ${error}`)
        throw AuthFieldError.of('email and password are required')
      }
    }
  }

  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: createNotNullMsg('firstName')
          },
          notEmpty: {
            msg: createNotNullMsg('firstName')
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: createNotNullMsg('lastName')
          },
          notEmpty: {
            msg: createNotNullMsg('lastName')
          }
        }
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: createNotNullMsg('email')
          },
          notEmpty: {
            msg: createNotNullMsg('email')
          },
          isEmail: {
            msg: 'The given email is not valid'
          }
        }
      },
      passwordHash: DataTypes.STRING,
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: createNotNullMsg('password')
          },
          notEmpty: {
            msg: createNotNullMsg('password')
          }
        }
      }
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
      console.log(`Users.beforeCreate() | ${error}`)
      throw new Error(error)
    }
  })

  return Users
}

const createNotNullMsg = (field) => `${field} cannot be null or empty`
