'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')
const Topic = db.model('topics')
const Relevance = db.model('relevances')

// All trending route
module.exports = router.get('/:topic', (req, res, next) => {
  console.log(req.params.topic)
  Relevance.findAll({
    where: {
      topic_name: req.params.topic
    },
    attributes: ['article_id']
  })
  .then(relatedArticlesObject => {
    const array = []
    relatedArticlesObject.forEach(obj => {
      array.push(Article.findOne( {where: {id: obj.article_id}}))
    })
    return Promise.all(array)
  })
  .then(data => {
    res.json(data)
  })
  .catch(next)
})

