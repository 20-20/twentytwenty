import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Login from './Login'
import WhoAmI from './WhoAmI'
import { fetchComments, addComment } from '../reducers/comments'

function Comments2({ comments }) {
  return (
    <article className='media'>
      <figure className='media-left'>
        <p className='image is-48x48 leftBuffer'>
          <img src='http://bulma.io/images/placeholders/128x128.png' />
        </p>
      </figure>
      {
      comments.map(comment =>
        <div className='media-content' id={comment.id}>
          <div className='content'>
            <p className='is-size-7 rightBuffer'>
              {/* <strong>{userName}</strong> */}
              <p>{comment.text}</p>
              <a>Like</a>
              <a>Reply</a>
            </p>
          </div>
        </div>
      )
      }
    </article>
  )
}

export default Comments2
