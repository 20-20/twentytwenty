'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

// All products route
module.exports = router.get('/', (req, res, next) => {
  Article.findAll({ limit: 10 })
    .then(articles => res.json(articles))
    .catch(next)
})
