const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

class UserController {

    static register = async(req, res) => {

        try {

            /* Hash and salt the password */
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(req.body.password, salt)

            /* Create user object */
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hash
            }

            /* Insert into database */
            const result = await User.create({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            })

            /* Return success */
            res.status(201).json({
                message: 'Resource created.',
                resource: result.dataValues,
                token: jwt.sign({userId:result.dataValues.id}, JWT_SECRET, {expiresIn: '1h'})
            })

        } catch (error) {

            /* Return fail */
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })

        }
        
    }
    
    static login = async(req, res) => {

        try {

            /* Create login obj */
            const user = {
                email: req.body.email,
                password: req.body.password
            }

            /* Verify is email and password belongs to user */
            const emailFound = await User.findOne({
                where: {email: user.email}
            })

            /* If email does not exist */
            if (!emailFound) {
                res.status(404).json({
                    errors: ["Email not found."]
                })
                return;
            }

            /* Compare passwords */
            const databasePassword = emailFound.dataValues.password
            const compare = await bcrypt.compare(user.password, databasePassword)

            /* Password incorrect */
            if (!compare) {
                res.status(400).json({
                    errors: ["Wrong password."]
                })
                return;
            }

            /* Generate token  */  
            const userId = emailFound.dataValues.id
            const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '1h'})

            /* Return token to user */
            res.status(201).json({
                message: "Login successfull.",
                id: userId,
                token: token
            })

        } catch (error) {
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })
        }


    }

    static readUser = async(req, res) => {

        try {

            const id = Number(req.params.id)
            const idFound = await User.findByPk(id)

            if (!idFound) {
                res.status(404).json({
                    errors: ['Id not found.']
                })
                return;
            }

            res.status(200).json({
                message: 'Id was found.',
                resource: idFound
            })
            
        } catch (error) {

            /* Return fail */
            res.status(400).json({
                errors: ['Algo deu errado.'],
                catch: error
            })

        }
    }

    static updateUser = async(req, res) => {

        try {
            
            /* See if user exists */
            const userFound = await User.findByPk(req.user.id)

            if (!userFound) {
                res.status(404).json({
                    errors: ['User not found.']
                })
                return;
            }

            const newData = {
                username: req.body.username
            }

            await User.update({username: newData.username}, {where: {id: req.user.id}})

            res.status(200).json({
                message: 'Update successfull.',
                resource: newData
            })

        } catch (error) {

            /* Return fail */
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })
        }

    } 

    static deleteUser = async(req, res) => {

        try {
            
            /* See if user exists */
            const userFound = await User.findByPk(req.user.id)

            if (!userFound) {
                res.status(404).json({
                    errors: ['User not found'],
                })
                return;
            }

            await User.destroy({where: {id: req.user.id}})

            res.status(200).json({
                message: 'Delete successfull.',
            })

        } catch (error) {

            /* Return fail */
            res.status(400).json({
                errors: ['Something went wrong'],
                catch: error
            })
        }
    }

}

module.exports = UserController