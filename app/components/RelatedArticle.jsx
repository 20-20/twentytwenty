import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function RelatedArticle({ article }) {

  return (
    <div className="column is-one-quarter">
      <NavLink to={`/SingleArticle/${article.id}`} id={article.id} className='card'>
          <div className='card-image'>
            <figure className='image'>
              <img src={article.urlToImage} alt='Image' />
            </figure>
          </div>
          <div className='card-content'>
            <div className='media'>
              <div className='media-content'>
                <p className='title is-4'>{article.title}</p>
                <p className='subtitle is-6'>{article.publication}</p>
              </div>
            </div>
            <div className='content'>
              {topic.body.slice(0, 50)}...
              <br />
              <RadarChart singleArticle={topic} width={250} height={250} padding={30}/>
              <small>Published {topic.date.slice(0, 10)}</small>
            </div>
          </div>
      </NavLink>
    </div>
  )
}

export default RelatedArticle
