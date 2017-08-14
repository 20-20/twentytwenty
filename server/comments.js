'use strict'

const db = require('APP/db')
const Comment = db.Comment
const User = db.User
const router = require('express').Router()

module.exports = router

// Get all comments
router.get('/', (req, res, next) => {
  Comment.findAll()
    .then(comments => res.json(comments))
    .catch(next)
})

// Post new comment
router.post('/', (req, res, next) => {
  Comment.create(req.body)
    .then(comment => res.json(comment))
    .catch(next)
})

// Update comment
router.put('/:commentId', (req, res, next) => {
  Comment.findById(req.params.id)
  .then(comment => {
    return comment.update(req.body)
  })
  .then(updatedcomment => res.json(updatedcomment))
  .catch(next)
})

// DELETE one comment @ /api/comments
router.delete('/:commentId', (req, res, next) => {
  const id = req.params.commentId
  Comment.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next)
})
