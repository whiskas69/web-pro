const express = require('express')
const app = express()
const port = 3002


const path = require('path')

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Config Router
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')

app.use('/', indexRouter)
app.use('/blog', blogRouter)

 




app.listen(port, () => {
  console.log(`Start server at port ${port}`)
})
