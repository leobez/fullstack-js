const {Sequelize, DataTypes} = require('sequelize')
const dotenv = require('dotenv').config()

/* Create connection */
const sequelize = new Sequelize(
    'acc_database', 
    process.env.DB_USER, 
    process.env.DB_PASS, 
        {
            host: 'localhost',
            dialect: 'mysql'
        }
)

sequelize.sync({force: true}).then(() => {
    console.log("A connection has been successfully synced.")
}).catch((err) => {
    console.log(err)
})

module.exports = sequelize
