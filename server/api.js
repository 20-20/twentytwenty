'use strict'

const api = module.exports = require('express').Router()
const eventRegistryCaller = require('./news')
eventRegistryCaller()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/comments', require('./comments'))
  .use('/trending', require('./trending'))
  .use('/singleArticle', require('./singleArticle'))
  .get('/news', require('./news'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
