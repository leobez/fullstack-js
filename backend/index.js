const express = require('express')
const app = express()
const port = 3000
const {validationResult, check} = require('express-validator')

/* DB Connection */
const connection = require('./db/conn')

/* JSON and urlencoded*/
app.use(express.json())
app.use(express.urlencoded({extended:false}))

/* Routes */
const UserRouter = require('./routes/UserRouter')
app.use('/user', UserRouter)

const PostRouter = require('./routes/PostRouter')
app.use('/post', PostRouter)

app.listen(port, () => {
    console.log('App listening on port: ', port)
})