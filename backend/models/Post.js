const {DataTypes} = require('sequelize')
const sequelize = require('../db/conn')

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})


module.exports = Post