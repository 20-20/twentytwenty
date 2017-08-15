const db = require('App/db')
const Article = db.model('articles')
const router = require('express').Router()
var request = require('request')


function eventregistryCall() {
  request.get(`http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22categoryUri%22%3A%7B%22%24or%22%3A%5B%22dmoz%2FSociety%2FPolitics%22%5D%7D%7D%2C%7B%22sourceUri%22%3A%7B%22%24or%22%3A%5B%22bbc.co.uk%22%2C%22foxnews.com%22%2C%22edition.cnn.com%22%2C%22nytimes.com%22%2C%22wsj.com%22%2C%22washingtonpost.com%22%2C%22chicagotribune.com%22%2C%22chicago.suntimes.com%22%5D%7D%7D%2C%7B%22dateStart%22%3A%222017-08-13%22%2C%22dateEnd%22%3A%222017-08-14%22%2C%22lang%22%3A%22eng%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=rel&articlesCount=20&articlesIncludeArticleCategories=true&articlesIncludeArticleLocation=true&articlesIncludeArticleImage=true&articlesIncludeArticleSocialScore=true&apiKey=16a9fc93-efc1-466c-b71d-52c5dc7224cd`, (error, response, data) => {
    var results = JSON.parse(data)
    console.log(results)
    results.articles.results.forEach(result =>
      Article.findOrCreate({
        where: {
          url: result.url,
          title: result.title,
          body: result.body,
          urlToImage: result.image,
          publication: result.source.title,
          date: result.date
        }
      })
    )
  })
}

setInterval(eventregistryCall, 3600000)

module.exports = request
