'use strict'

const db = require('APP/db')
const User = db.model('users')
const router = require('express').Router()
const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = router

// GET api/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

// POST /api/users
router.post('/', (req, res, next) => {
  console.log('req.body:', req.body)
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

// PUT /api/users/:id
router.put('/:userId', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.update(req.body))
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

// DELETE /api/users
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId

  User.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
