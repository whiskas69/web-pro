const express = require('express')
const router = express.Router()

const article = require('../public/article-db.json')

router.get('/blogapi', (req, res) => {
  var data = {
    title:"All Blogs",
    article:article
  }
  res.render('blog_list', data)
})

router.get('/blogapi/:id/:name', (req, res) => {
  console.log(req.query)
  res.json(article.find(article => article.id === req.params.id))
})




router.get('/:id', (req, res, next) => {
  var data = {
    title:"All Blogs",
    article:article[(req.params.id) - 1],

  }
  if(article.find(article => article.id === req.params.id)){
    res.render('detail.ejs', data)
  }
  else{
    res.send("<h1>ไม่พบบทความ</h1>")
  }
})




module.exports = router
