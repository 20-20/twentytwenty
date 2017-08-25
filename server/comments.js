'use strict'

const db = require('APP/db')
const Comment = db.model('comments')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')


// Single comment Route
router.get('/:articleId', (req, res, next) => {
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(next)
})

// post comment
router.post('/', (req, res, next) => {
  Comment.create(req.body)
  .then(comment => res.json(comment))
  .catch(next)
})

module.exports = router
