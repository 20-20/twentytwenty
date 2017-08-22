
'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const router = require('express').Router()
const request = require('request')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')
const sentimentAnalysis = require('./sentiment')
const axios = require('axios')

/* BELOW FOR CHROME EXTENSION */

const createArticle = async (article, trending) => {
  const articleProps = article[Object.keys(article)[0]].info
  const watson = await sentimentAnalysis(articleProps.url)
  return Article.create({
    url: articleProps.url,
    title: articleProps.title,
    body: articleProps.body,
    urlToImage: articleProps.image,
    publication: articleProps.source.title,
    date: articleProps.date,
    trending: trending,
    sentimentScore: watson.sentiment.document.score,
    sadness: watson.emotion.document.emotion.sadness,
    fear: watson.emotion.document.emotion.fear,
    anger: watson.emotion.document.emotion.anger,
    disgust: watson.emotion.document.emotion.disgust,
    joy: watson.emotion.document.emotion.joy
  })
}

const createArticleParagraphs = function(text, url, articleId) {
  let allParagraphs = text.split('\n')
  allParagraphs = allParagraphs.filter(paragraph => paragraph !== '')
  const promises = []
  allParagraphs.forEach((paragraph, index) => {
    promises.push(Paragraph.create({
      text: paragraph,
      index,
      url,
      article_id: articleId
    }))
  })
  return Promise.all(promises)
}

// uriChecker(uri) {
//   request.get(
//   'http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + `&includeAllVersions=false&deep=true`,
//   (error, response, data) => {
//     const uriObj = JSON.parse(data)
//     const uri = uriObj[Object.keys(uriObj)[0]]
//     console.log('here is the uri', uri)

// }

router.post(`/:url`, (req, res, next) => {
  const decodedUrl = req.params.url.includes('html')
    ? decodeURIComponent(req.params.url).split(`html`)[0] + `html`
    : decodeURIComponent(req.params.url)
  Article.findOne({
    where: { url: decodedUrl },
    include: [{ model: Paragraph, include: [Comment] }]
  })
  .then(retObj => {
    if (retObj) res.json(retObj)
  }).then(() => axios.get('http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + `&includeAllVersions=false&deep=true`))
  .then(result => {
    const uriObj = result.data
    const uri = uriObj[Object.keys(uriObj)[0]]
    if (uri === null) res.sendStatus(404)
    else return uri
  }).then((uri) => axios.get('http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
    '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000')).then(result => {
    const articleInfo = result.data
    return createArticle(articleInfo, req.query.trending)
  }).then(article => createArticleParagraphs(article.body, article.url, article.id)
  ).then(([...paragraphs]) => console.log("paragraph length". paragraphs)
  // res.json(article)
  ).catch(next)
})

// const getArticle = function(articleUrl) {
//   request.get(
//     'http://eventregistry.org/json/articleMapper?articleUrl=' + articleUrl + '&includeAllVersions=false&deep=true',
//     (error, response, data) => {
//       const uriObj = JSON.parse(data)
//       const uri = uriObj[Object.keys(uriObj)[0]]
//       console.log('uri', uri)
//       if (uri === null) return
//       request.get(
//         'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
//         '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000',
//         (error, response, data) => {
//           const validation = JSON.parse(data)[uri].error
//           if (validation && validation.startsWith('Invalid article uri')) return
//           createArticle(JSON.parse(data))
//             .then(article => {
//               Promise.resolve(createArticleParagraphs(article.body, article.url, article.id))
//                 .then(articleId => {
//                   Article.findOne({
//                     where: { id: articleId },
//                     include: [{ model: Paragraph, include: [Comment] }]
//                   })
//                     .then(article => res.json(article)) // errors produced here...
//                 })
//                 .catch(() => console.log('Error appending article to DB'))
//             })
//         })
//     }
//   )
// }

// router.post('/:url', (req, res, next) => {
//   console.log('we are making a get request')
//   const decodedUrl = decodeURIComponent(req.params.url).split('html')[0] + 'html'
//   console.log('here is the decoded url', decodedUrl)
//   Article.findOne({
//     where: { url: decodedUrl },
//     include: [{ model: Paragraph, include: [Comment] }]
//   })
//     .then(retObj => {
//       if (retObj) res.json(retObj)
//       else {
//         getArticle(req.params.url)
//       }
//     })
// })

/* BELOW FOR WEB APP */

router.get('/:articleId', (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.articleId
    },
    include: [{ model: Paragraph, include: [Comment] }]
  })
    .then(article => res.json(article))
    .catch('Error fetching article with provided Id')
})

module.exports = { router, createArticle, createArticleParagraphs }
