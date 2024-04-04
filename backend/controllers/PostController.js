const Post = require('../models/Post')

class PostController {

    static createPost = async(req, res) => {    

        try {

            /* Create new post obj */
            const newPost = {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id
            }

            const result = await Post.create({
                title: newPost.title,
                content: newPost.content,
                UserId: newPost.userId
            })

            res.status(201).json({
                message: 'Resource created.',
                resource: result.dataValues
            })

        } catch (error) {

            /* Return fail */
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })

        }

    }

    static readAllPosts = async(req, res) => {

        try {
            
            const allPosts = await Post.findAll()

            res.status(201).json({
                message: 'Resource found.',
                resource: allPosts
            })

        } catch (error) {
            
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })

        }

    }
    
    static readPost = async(req, res) => {

        try {

            const postId = Number(req.params.id)

            const post = await Post.findByPk(postId)

            if (!post) {
                res.status(404).json({
                    errors: ['Post not found.']
                })
                return;
            }

            res.status(201).json({
                message: 'Resource found.',
                resource: post
            })
            

        } catch (error) {

            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })

        }
    }

    static updatePost = async(req, res) => {

        try {
            
            /* Verify if post exists */
            const postFound = await Post.findByPk(req.params.id)

            if (!postFound) {
                res.status(404).json({
                    errors: ['Post not found.']
                })
                return;
            }

            /* Validate if post is owned by current user */
            const userId = Number(req.user.id)
            const postOwner = Number(postFound.UserId)

            if (userId !== postOwner) {
                res.status(401).json({
                    errors: ['User can not update this post.']
                })
                return;
            }
            
            /* Create new post obj */
            const postId = req.params.id
            const newPost = {
                title: req.body.title,
                content: req.body.content
            }

            await Post.update({title: newPost.title, content: newPost.content}, {where: {id:postId}})

            res.status(201).json({
                message: 'Update successfull.',
            })

        } catch (error) {
            
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })
        }

    }

    static deletePost = async(req, res) => {
        
        try {
            
            /* Verify if post exists */
            const postFound = await Post.findByPk(req.params.id)

            if (!postFound) {
                res.status(404).json({
                    errors: ['Post not found.']
                })
                return;
            }

            /* Validate if post is owned by current user */
            const userId = Number(req.user.id)
            const postOwner = Number(postFound.UserId)

            if (userId !== postOwner) {
                res.status(401).json({
                    errors: ['User can not delete this post.']
                })
                return;
            }
            
            /* Create new post obj */
            const postId = req.params.id

            await Post.destroy({where: {id:postId}})

            res.status(201).json({
                message: 'Delete successfull.',
            })

        } catch (error) {
            
            res.status(400).json({
                errors: ['Something went wrong.'],
                catch: error
            })
        }
    }
}

module.exports = PostController