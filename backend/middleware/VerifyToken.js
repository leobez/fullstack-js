const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/User')

const VerifyToken = async(req, res, next) => {
    
    if (!req.headers.authorization) {
        res.status(401).json({
            errors: ['Token not found.']
        })
        return;
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        res.status(401).json({
            errors: ['Token not found.']
        })
        return;
    } 

    try {

        const verified = jwt.verify(token, JWT_SECRET)

        /* Verify if token is valid */
        if (!verified) {
            res.status(401).json({
                errors: ['Token invalid.']
            })
            return;
        } 

        const user = await User.findByPk(verified.userId)

        if (!user) {
            res.status(404).json({
                errors: ['Token user not found.']
            })
            return;
        }

        const {password, ...remainder} = user.dataValues
        req.user = remainder

        next()

    } catch (error) {

        res.status(400).json({
            errors: ['Something went wrong.'],
            catch: error
        })
        
    }
      
}

module.exports = VerifyToken