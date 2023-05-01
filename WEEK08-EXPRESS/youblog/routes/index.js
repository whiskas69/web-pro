const express = require('express')
const router = express.Router()
const article = require('../public/article-db.json')

router.get('/', (req, res) => {
    var Search = req.query.search
    console.log(Search)
    var Filtervalue = article.filter((item) => item.title.toLowerCase().includes(String(Search).toLowerCase()) || Search == null)

    var data = {
        title: 'Express',
        name: 'Rome',
        article: Filtervalue
    }
    res.render('index', data)
})

module.exports = router
