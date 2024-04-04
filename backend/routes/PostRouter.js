const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const VerifyToken = require('../middleware/VerifyToken')

const validate = require('../middleware/HandleValidation')
const {createPostValidate,deletePostValidate,readPostValidate,updatePostValidate} = require('../middleware/ValidatePostData')

router.post('/create', VerifyToken, createPostValidate(), validate, PostController.createPost)

router.get('/readAll', VerifyToken, PostController.readAllPosts)
router.get('/read/:id', VerifyToken, readPostValidate(), validate, PostController.readPost)

router.post('/update/:id', VerifyToken, updatePostValidate(), validate, PostController.updatePost)

router.post('/delete/:id', VerifyToken, deletePostValidate(), validate, PostController.deletePost)


module.exports = router