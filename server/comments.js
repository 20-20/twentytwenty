'use strict'

const db = require('APP/db')
const Comment = db.model('comments')
const User = db.model('users')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')


// All comments Route
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

// post comment
router.post('/', (req, res, next) => {
  Comment.create(req.body)
  .then(comment => res.json(comment))
  .catch(next)
})

// get comment
router.get('/:id', (req, res, next) => {
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(next)
})

// // Get all comments
// router.post('/paragraphId', (req, res, next) => {
//   Comment.findById(req.params.id)
//     .then(comment => res.json(comment))
//     .catch(next)
// })

// // Single comment Route
// router.get('/:id', (req, res, next) => {
//   Comment.findById(req.params.id)
//     .then(comment => res.json(comment))
//     .catch(next)
// })

// // Update comment
// router.put('/:commentId', (req, res, next) => {
//   Comment.findById(req.params.id)
//   .then(comment => comment.update(req.body))
//   .then(updatedcomment => res.json(updatedcomment))
//   .catch(next)
// })
module.exports = router
