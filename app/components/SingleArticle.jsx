import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import Comments from './Comments.jsx'

function SingleArticle({ trending, comments, singleArticle, componentProps }) {

  const article = singleArticle && singleArticle.id

  return (
    <div className="container" >
      <hr />
      <div>
        {trending.length &&
        <div className="columns">
            <div className="column is-two-thirds">
              <h1 className="title is-1">{article && singleArticle.title}</h1>
              <hr />
              <h2 className="subtitle is-3">{article && singleArticle.publication}</h2>
              <a href={article && singleArticle.url}>Link to Article</a>
              <figure className="image">
                <img style={{ maxWidth: '100%', height: 'auto' }} src={article && singleArticle.urlToImage} className="" />
              </figure>
              {
                singleArticle.paragraphs && singleArticle.paragraphs.map(para => (
                  <div><p key={para.index}>{para.text}</p><br /></div>)
                )
              }
            </div>
            <Comments/>
        </div>
        }
      </div>
    </div>
  )
}

const mapState = ({ trending, comments, singleArticle }, componentProps) => ({
  trending,
  comments,
  singleArticle: trending.find(article => article.id === +componentProps.match.params.id)
})

export default connect(mapState)(SingleArticle)
