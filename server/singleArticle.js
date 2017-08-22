
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

/* Event Registry Api Functions */
const eventRegistryFull = (url, trending) => {
  return eventRegistryUri(url)
  .then(uri => {
    if (uri === null) throw new Error('This article cannot be found')
    else return uri
  }).then((uri) =>
    eventRegistryContent(uri)
  ).then(result => {
    const articleInfo = result.data
    return createArticle(articleInfo, trending)
  }).then(article => createArticleParagraphs(article.body, article.url, article.id)
  ).then(([...paragraphs]) => Article.findOne({
    where: { id: paragraphs[0].article_id },
    include: [{ model: Paragraph, include: [Comment] }]
  }))
}

const eventRegistryUri = (url) => {
  return axios.get('http://eventregistry.org/json/articleMapper?articleUrl=' + url + `&includeAllVersions=false&deep=true`)
  .then(result => {
    const uriObj = result.data
    return uriObj[Object.keys(uriObj)[0]]
  })
}

const eventRegistryContent = (uri) => {
  return axios.get('http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
    '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000')
}

/* Event Registry Api Functions till here */

/* Article Creation Functions */
const createArticle = async (article, trending) => {
  const articleProps = article[Object.keys(article)[0]].info
  const watson = await sentimentAnalysis(articleProps.url)
  console.log(watson)
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

/*       Article Creation Functions till here       */

/********        Routes        ********/

// route for chrome extension
router.post(`/:url`, (req, res, next) => {
  const decodedUrl = req.params.url.includes('html')
    ? decodeURIComponent(req.params.url).split(`html`)[0] + `html`
    : decodeURIComponent(req.params.url)
  Article.findOne({
    where: { url: decodedUrl },
    include: [{ model: Paragraph, include: [Comment] }]
  })
  .then(retObj => {
    if (retObj) return retObj
    else return eventRegistryFull(req.params.url, req.query.trending)
  })
  .then(articleWithParagraphs =>
    res.json(articleWithParagraphs)
  ).catch(error => console.log(error.message))
})

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

/********        Routes till here        ********/

module.exports = { router, createArticle, createArticleParagraphs }
