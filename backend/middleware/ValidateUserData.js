const {body, param} = require('express-validator')

const registerValidate = () => {

    return [
        body('username')
            .isString().withMessage('Username is required.')
            .isLength({min: 3}).withMessage('Minimum length for username is 3.'),
        body('email')
            .isString().withMessage('Email is required.')
            .isEmail().withMessage('Enter a valid email.'),
        body('password')
            .isString().withMessage('Password is required.')
            .isLength({min: 5}).withMessage('Minimum length for password is 5.'),
        body('confirmpassword')
            .isString().withMessage('Confirmation password is required.')
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.')
                }
                return true
            })
    ]
}

const loginValidate = () => {
    return [
        body('email')
            .isString().withMessage('Email is required.')
            .isEmail().withMessage('Enter a valid email.'),
        body('password')
            .isString().withMessage('Password is required.')
    ]
}

const readUserValidate = () => {
    return [
        param('id')
            .isNumeric().withMessage('Invalid id.')
    ]
}

const updateUserValidate = () => {
    return [
        body('username')
            .isString().withMessage('Username is required.')
    ]
}

module.exports = {
    registerValidate,
    loginValidate,
    readUserValidate,
    updateUserValidate
}