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

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(next)
})

// POST /api/users
router.post('/', (req, res, next) => {
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

