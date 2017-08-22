const app = require('APP'), { env } = app
const { username, password } = require('../watson-config.js')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'username': username,
  'password': password,
  'version_date': '2017-02-27'
})

function sentimentAnalysis(targetUrl) {
  const parameters = {
    'url': targetUrl,
    'features': {
      'sentiment': { 'document': true },
      'keywords': {
        'sentiment': true,
        'emotion': true,
        'limit': 3
      },
      'concepts': {
        'limit': 4
      },
      'entities': {
        'limit': 4
      },
      'emotion': {}
    }
  }

  return new Promise((resolve, reject) => {
    naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports = sentimentAnalysis
