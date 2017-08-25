const db = require('App/db')
const Article = db.model('articles')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const router = require('express').Router()
const request = require('request')
const { createArticle, createArticleParagraphs } = require('./singleArticle')
const axios = require('axios')

function eventregistryTrendingCall() {
  axios.get('http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22categoryUri%22%3A%7B%22%24or%22%3A%5B%22dmoz%2FSociety%2FPolitics%22%5D%7D%7D%2C%7B%22sourceUri%22%3A%7B%22%24or%22%3A%5B%22wsj.com%22%2C%22nytimes.com%22%2C%22chicagotribune.com%22%2C%22chicago.suntimes.com%22%2C%22economist.com%22%2C%22abcnews.go.com%22%2C%22foxnews.com%22%2C%22edition.cnn.com%22%2C%22bbc.co.uk%22%2C%22bbc.com%22%2C%22bloomberg.com%22%2C%22washingtonpost.com%22%5D%7D%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=rel&articlesCount=10&articlesIncludeArticleEventUri=false&articlesIncludeArticleLocation=true&articlesIncludeArticleImage=true&articlesIncludeArticleDetails=true&articlesArticleBodyLen=10000')
  .then(res => res.data)
  .then(results => {
    const promises = []
    results.articles.results.forEach(result => {
      promises.push(
       axios.post(`http://localhost:1337/api/singleArticle/${encodeURIComponent(result.url)}?trending=true`)
      )
    })
    return Promise.all(promises)
  })
}

module.exports = eventregistryTrendingCall
