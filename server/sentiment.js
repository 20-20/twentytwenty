const app = require('APP'), { env } = app
const { username, password } = require('../watson-config.js')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'username': username,
  'password': password,
  'version_date': '2017-02-27'
})

function sentimentAnalysis(targetUrl) {
  // OB/ET: could return a promise
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
      }
    }
  }

  naturalLanguageUnderstanding.analyze(parameters, function (err, response) {
    if (err) {
      console.log('error:', err) // <= OB/ET: this is where you'd resolve that promise
    } else {
      console.log(JSON.stringify(response, null, 2)) // <= OB/ET: this is where you'd reject that promise
    }
  })
}

module.exports = sentimentAnalysis

sentimentAnalysis('https://www.nytimes.com/2017/08/20/world/asia/trump-afghanistan-strategy-mattis.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news&_r=0')