const app = require('APP'), { env } = app
const { username, password } = require('../watson-config.js')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'username': username,
  'password': password,
  'version_date': '2017-02-27'
})

function naturalLanguage(targetUrl) {
  const parameters = {
    'url': targetUrl,
    'features': {
      'keywords': {
        'sentiment': true,
        'emotion': true,
        'limit': 3
      }
    }
  }

  naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
    if (err) {
      console.log('error:', err)
    } else {
      console.log(JSON.stringify(response, null, 2))
    }
  })
}

module.exports = naturalLanguage
