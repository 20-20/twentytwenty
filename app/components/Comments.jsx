import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchComments, addComment } from '../reducers/comments'
import singleArticle from '../reducers/singleArticle'
import { appendFormSubmission } from '../../chromeExtension/sidebar'
import { fetchArticleData, addHoverHandler, commentDisplay } from '../../chromeExtension/comments'

class Comments extends Component {

  componentDidMount() {
    this.addChrExtComments(this.props)
  }

  render() {
    const user = this.props.user ? this.props.user : {}
    const comments = this.props.comments ? this.props.comments : []
    console.log("here are the comments", comments)
    return (
      <div >
        <nav className="panel">
          <p className="panel-heading">
            <strong>Comments</strong>
          </p>
        </nav>

        <article className='contentHere'></article>

        {
          comments.map(comment => (
            <article className='media indComment' id={comment && comment.id} key={comment.id}>
              <figure className='media-left'></figure>
              <div className='media-content'>
                <div className='content'>
                  <p className='is-size-7'>
                    <strong>{user.name}</strong>
                    <br/>{comment.text}<br/>
                  </p>
                </div>
              </div>
            </article>
          ))
        }

        <article className='media'>
          <div className='media-content'>
            <form id='webFormSubmission'>
              <div className='field'>
                <p className='control'>
                  <textarea
                    id='webCommentSubmission'
                    className='textarea is-size-7'
                    placeholder={`${user.name}, what do you think?`}
                ></textarea>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <input
                    type='submit'
                    className='button is-size-7'/>
                </p>
              </div>
            </form>
          </div>
        </article>
      </div>
    )
  }

  addChrExtComments(props) {
    $('#webFormSubmission').submit(function(evt) {
      evt.preventDefault()
      const newComment = {
        article_id: props.article.id,
        text: $('#webCommentSubmission').val(),
        user_id: props.user.id
      }
      props.addComment(newComment)
			$('#webCommentSubmission').val('')
    })
  }

}

const mapStateToProps = (state) => ({
  user: state.auth,
  article: state.singleArticle,
  comments: state.comments
})

const mapDispatchToProps = ({ addComment });

const commentsContainer = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default commentsContainer

