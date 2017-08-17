'use strict'

const db = require('APP/db')
const Comment = db.Comment
const router = require('express').Router()

module.exports = router

// post comment
router.post('/:articleId/:paragraphId', (req, res, next) => {
  Comment.create({
    article_id: req.params.articleId,
    paragraph_id: req.params.paragraphId,
    text: req.body.text
  })
  .then(comment => res.json(comment))
  .catch(next)
})
// update comment
// router.put('/:id', (req, res, next) => {
//   Comment.findById(req.params.id)
//   .then(article => article.update(req.body))
//   .then(updatedComment => res.json(updatedComment))
//   .catch(next)
// })

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
