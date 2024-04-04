const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')
const Post = require('./Post')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

User.hasMany(Post)

module.exports = User