
'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const router = require('express').Router()
const request = require('request')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

/* BELOW FOR CHROME EXTENSION */

const createArticle = (article) => {
  const articleProps = article[Object.keys(article)[0]].info
  // createArticleParagraphs(articleProps.body, articleProps.url)
  return Article.create({
    url: articleProps.url,
    title: articleProps.title,
    body: articleProps.body,
    urlToImage: articleProps.image,
    publication: articleProps.source.title,
    date: articleProps.date
  })
}

const createArticleParagraphs = function(text, url, articleId) {
  let allParagraphs = text.split('\n')
  allParagraphs = allParagraphs.filter(paragraph => paragraph !== '')
  allParagraphs.forEach((paragraph, index) => {
    Paragraph.create({
      text: paragraph,
      index,
      url,
      article_id: articleId
    })
  })
  return articleId
}

router.post('/:url', (req, res, next) => {
  console.log('we are maing a get request')
  const decodedUrl = decodeURIComponent(req.params.url).split('html')[0]+'html'
  Article.findOne({
    where: { url: decodedUrl },
    include: [{model: Paragraph, include: [Comment]}]
  })
    .then(retObj => {
      if (retObj) res.json(retObj)
      else {
        request.get(
          'http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true',
          (error, response, data) => {
            const uriObj = JSON.parse(data)
            const uri = uriObj[Object.keys(uriObj)[0]]
            console.log(uri)
            if (uri === null) return
            request.get(
              'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
              '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000',
              (error, response, data) => {
                const validation = JSON.parse(data)[uri].error
                if (validation.startsWith('Invalid article uri')) return
                createArticle(JSON.parse(data))
                .then(article => {
                  Promise.resolve(createArticleParagraphs(article.body, article.url, article.id))
                  .then(articleId => {
                    Article.findOne({
                      where: { id: articleId },
                      include: [{model: Paragraph, include: [Comment]}]
                    })
                    .then(article => res.json(article))
                  })
                  .catch(() => console.log('Error appending article to DB'))
                })
              })
          }
        )
      }
    })
})

/* BELOW FOR WEB APP */

router.get('/:articleId', (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.articleId
    },
    include: [{model: Paragraph, include: [Comment]}]
  })
    .then(article => res.json(article))
    .catch('Error fetching article with provided Id')
})

module.exports = router
