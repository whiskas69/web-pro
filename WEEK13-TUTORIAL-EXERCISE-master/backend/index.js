const express = require("express")

const app = express();
const cors = require('cors')
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const commentRouter = require('./routes/comment')
const imageRouter = require('./routes/image')
const userRouter = require('./routes/user')
// const createBlogRouter = require('./routes/createBlog')

app.use(indexRouter.router)
app.use(blogRouter.router)
app.use(commentRouter.router)
app.use(imageRouter.router)
app.use(userRouter.router)
// app.use(createBlogRouter.router)

app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})