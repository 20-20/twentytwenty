import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function RelatedArticle({ topic }) {

  return (
    <div className="column is-one-quarter">
      <div className='card'>
        <div className='card-image'>
          <figure className='image'>
            <img src={topic.urlToImage} alt='Image' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-4'>{topic.title}</p>
              <p className='subtitle is-6'>{topic.publication}</p>
            </div>
          </div>
          <div className='content'>
            {topic.body.slice(0, 50)}...
          <br />
            <small>Published {topic.date.slice(0, 10)}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedArticle
