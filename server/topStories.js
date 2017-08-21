'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()

module.exports = router
  .get('/totalComments',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['commentsCount', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )

module.exports = router
  .get('/totalVotes',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['totalVotes', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )

module.exports = router
  .get('/upVotes',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['upVotes', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )

module.exports = router
  .get('/downVotes',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['downVotes', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )

module.exports = router
  .get('/engagement',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['engagement', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )
