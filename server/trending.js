'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

// All trending route
module.exports = router.get('/', (req, res, next) => {
  Article.findAll({
    where: {status: 'trending'},
    limit: 10,
    order: [['created_at', 'DESC']]
  })
    .then(articles => res.json(articles))
    .catch(next)
})
