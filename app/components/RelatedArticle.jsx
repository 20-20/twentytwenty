import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import RadarChart from './RadarChart'

function RelatedArticle({ relatedArticle }) {

  return (
    <div className="column is-one-quarter">
      <NavLink to={`/SingleArticle/${relatedArticle.id}`} id={relatedArticle.id} className='card'>
          <div className='card-image'>
            <figure className='image'>
              <img src={relatedArticle.urlToImage} alt='Image' />
            </figure>
          </div>
          <div className='card-content'>
            <div className='media'>
              <div className='media-content'>
                <p className='title is-4'>{relatedArticle.title}</p>
                <p className='subtitle is-6'>{relatedArticle.publication}</p>
              </div>
            </div>
            <div className='content'>
              {relatedArticle.body.slice(0, 50)}...
              <br />
              <RadarChart singleArticle={relatedArticle} width={250} height={250} padding={30}/>
              <small>Published {relatedArticle.date.slice(0, 10)}</small>
            </div>
          </div>
      </NavLink>
    </div>
  )
}

export default RelatedArticle
