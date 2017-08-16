'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const router = require('express').Router()
const request = require('request')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

const createArticle = (article) => {
  const articleProps = article[Object.keys(article)[0]].info
  console.log('date', articleProps.date)
  return Article.create({
    url: articleProps.url,
    title: articleProps.title,
    body: articleProps.body,
    urlToImage: articleProps.image,
    publication: articleProps.source.title,
    date: articleProps.date
  })
}

// const articleCreationProcess = (url) => {
//   request.get(
//     'http://eventregistry.org/json/articleMapper?articleUrl=' + url + '&includeAllVersions=false&deep=true',
//     (error, response, data) => {
//       const uriObj = JSON.parse(data)
//       const uri = uriObj[Object.keys(uriObj)[0]]
//       request.get(
//         'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
//         '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000',
//         (error, response, data) => createArticle(JSON.parse(data)) // returns createdArticle
//         // .catch(() => console.log("You've reached the articleCreationProcess catch"))
//       )
//     }
//   )
// }

module.exports = router
  .get('/:url', (req, res, next) => {
    const decodedUrl = decodeURIComponent(req.params.url).split('html')[0]+'html'
    Article.findOne({
      where: {
        url: decodedUrl
      },
      include: [{model: Paragraph, include: [Comment]}]
    })
      .then((retObj) => {
        console.log('here is the return object:', retObj)
        if (!retObj) {
          request.get(
            'http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true',
            (error, response, data) => {
              const uriObj = JSON.parse(data)
              const uri = uriObj[Object.keys(uriObj)[0]]
              request.get(
                'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri +
                '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000',
                (error, response, data) => {
                  createArticle(JSON.parse(data))
                  .then(article => res.json(article))
                }
              )
            }
          )
        } else res.json(retObj)
      })
  })

          /* Old article creation process */
            // articleCreationProcess(req.params.url)
            // .then(createdArticle => {
            //   console.log('here is the created article:', createArticle)
            //   res.json(createArticle)
            // })

  //   .then(article => res.json(article))
  //   .catch(next)
  //   .then(() => request.get('http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true', (error, response, data) => {
  //     const uriObj = JSON.parse(data)
  //     const uri = uriObj[Object.keys(uriObj)[0]]
  //     request.get('http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri + '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000', (error, response, data) => createArticle(JSON.parse(data))
  //     .then((article) => res.json(article))
  //     .catch(next)
  //   )
  //   })
  //   )
  // })

      // console.log(JSON.parse(data))
      // JSON.parse(data)
      // .then((uri) => { console.log('interim uri', uri)
      // return request.get('http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri[Object.keys(uri)[0]] + '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000', (error, response, data) => console.log('article', JSON.parse(data))) })
    // })}))})
  //   .then((article) => {
  //     Article.create({where: {
  //     url: article[Object.keys(article)[0]].info.url,
  //     title: article[Object.keys(article)[0]].info.title,
  //     body: article[Object.keys(article)[0]].info.body,
  //     urlToImage: article[Object.keys(article)[0]].info.image,
  //     publication: article[Object.keys(article)[0]].info.title,
  //     date: article[Object.keys(article)[0]].info.date
  //   }
  //   })
  //   })
  //   .then(article => res.json(article))
  //   .catch(next)
  // })

// 'http://eventregistry.org/json/articleMapper?articleUrl=' + req.params.url + '&includeAllVersions=false&deep=true&callback=JSON_CALLBACK'

// //"http://www.cnn.com/2017/08/15/politics/donald-trump-jack-posobiec/index.html": "709796781"

// 'http://eventregistry.org/json/article?action=getArticle&articleUri=' + uri + '&resultType=info&infoIncludeArticleCategories=true&infoIncludeArticleLocation=true&infoIncludeArticleImage=true&infoArticleBodyLen=10000&callback=JSON_CALLBACK'
