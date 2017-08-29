'use strict'

const db = require('APP/db')
const Comment = db.model('comments')
const User = db.model('users')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

router.get('/:articleId', (req, res, next) => {
  Comment.findAll({
    where:{
      article_id: req.params.articleId
    },
    include: [User]
  })
  .then(comment => res.json(comment))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Comment.create(req.body)
  .then(comment => res.json(comment))
  .catch(next)
})

module.exports = router
