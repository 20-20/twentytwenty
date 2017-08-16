'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const request = require('request')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

// All trending route
module.exports = router.get('/:url', (req, res, next) => {
  Article.find({ where: { url: req.params.url } })
      .then(article => res.json(article))
      .catch(next)
      .then(() => request.get('http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true&callback=JSON_CALLBACK', (error, response, data) => JSON.parse(data)))
      .then((uri) => request.get('http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri[Object.keys(uri)[0]] + '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000&callback=JSON_CALLBACK', (error, response, data) => JSON.parse(data)))
      .then((article) => Article.create({where: {
        url: article[Object.keys(article)[0]].info.url,
        title: article[Object.keys(article)[0]].info.title,
        body: article[Object.keys(article)[0]].info.body,
        urlToImage: article[Object.keys(article)[0]].info.image,
        publication: article[Object.keys(article)[0]].info.title,
        date: article[Object.keys(article)[0]].info.date
      }
      })
      )
      .then(article => res.json(article))
      .catch(next)
})

// 'http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true&callback=JSON_CALLBACK'

// //"http://www.cnn.com/2017/08/15/politics/donald-trump-jack-posobiec/index.html": "709796781"

// 'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri + '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000&callback=JSON_CALLBACK'
