'use strict'

const app = require('APP'),
  debug = require('debug')(`${app.name}:models`),
  { mapValues } = require('lodash'),
  metaModels = {
    OAuth: require('./oauth'),
    User: require('./user'),
    Comment: require('./comment'),
    Article: require('./article'),
    Paragraph: require('./paragraph')
  }

module.exports = db => {
  const models = mapValues(metaModels, defineModel => defineModel(db))
  Object.keys(metaModels)
    .forEach(name => {
      const { associations } = metaModels[name]
      if (typeof associations === 'function') {
        debug('associating model %s', name)
        associations.call(metaModels[name], models[name], models)
      }
    })
  return models
}
