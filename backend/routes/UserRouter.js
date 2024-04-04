const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const VerifyToken = require('../middleware/VerifyToken')
const {registerValidate, loginValidate, readUserValidate, updateUserValidate} = require('../middleware/ValidateUserData')
const validate = require('../middleware/HandleValidation')

router.post('/register', registerValidate(), validate, UserController.register)
router.get('/login', loginValidate(), validate, UserController.login)
router.get('/read/:id', readUserValidate(), validate, UserController.readUser)
router.post('/update', VerifyToken, updateUserValidate(), validate, UserController.updateUser)
router.post('/delete', VerifyToken, UserController.deleteUser)

module.exports = router