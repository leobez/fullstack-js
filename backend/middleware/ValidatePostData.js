const {body, param} = require('express-validator')

const createPostValidate = () => {
    return [
        body('userId')
            .isNumeric().withMessage('Enter a valid user Id.'),
        body('title')
            .isString().withMessage('Title is required.'),
        body('content')
            .isString().withMessage('Content is required.')
    ]
}


const readPostValidate = () => {
    return [
        param('id')
            .isNumeric().withMessage('Enter a valid id.')
    ]
}

const updatePostValidate = () => {
    return [
        param('id')
            .isNumeric().withMessage('Enter a valid id.'),
        body('title')
            .optional()
            .isString().withMessage('Title is required.'),
        body('content')
            .optional()
            .isString().withMessage('Content is required.')
    ]
}

const deletePostValidate = () => {
    return [
        param('id')
            .isNumeric().withMessage('Enter a valid id.'),
    ]
}

module.exports = {
    createPostValidate,
    readPostValidate,
    updatePostValidate,
    deletePostValidate
}