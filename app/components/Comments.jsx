import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { NavLink, withRouter } from 'react-router-dom'
import addComment from '../reducers/comments'
import singleArticle from '../reducers/singleArticle'
import { appendFormSubmission } from '../../chromeExtension/sidebar'
import { fetchArticleData } from '../../chromeExtension/comments'

// import getSelectionTextAndHighlight from '../../chromeExtension/highlight'

// function Comments({ comments, auth }) {
class Comments extends Component {

  componentDidMount() {
    this.addChrExtComments()
  }

  render() {
    const user = this.props.user ? this.props.user : {}
    const comments = this.props.comments ? this.props.comments : []
    const divStyle = { paddingRight: '10%', paddingTop: '10%' }
    return (
      <div style={divStyle}>
        <nav className="panel">
          <p className="panel-heading annotate-header">
            <strong>Comments</strong>
          </p>
        </nav>

        <article className='contentHere'></article>
        {
          comments.map(comment => (
            <article className='media indComment' key={comment.id}>
              <figure className='media-left'></figure>
              <div className='media-content'>
                <div className='content'>
                  <p className='is-size-7 rightBuffer'>
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
            <form id='formSubmission'>
              <div className='field'>
                <p className='control rightBuffer'>
                  <textarea
                    id='commentSubmission'
                    className='textarea is-size-7'
                    placeholder={`${user.name}, what do you think?`}
                ></textarea>
                </p>
              </div>
              <div className='field'>
                <p className='control rightBuffer'>
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

  addChrExtComments() {
    if (this.props.comments) fetchArticleData(this.props.article)
    appendFormSubmission()
  }

}

  // appendFormSubmission() {
  //   $('#formSubmission').submit(function(evt) {
  // 		evt.preventDefault()
  //   })
  // }

    // const newComment = {
    //   article_id:
    //   paragraph_id:
    //   text:
    //   user_id:


// comment format:
	// postComment({
	// 	article_id,
	// 	paragraph_id,
	// 	text,
	// 	user_id: user.id,
	// 	domElText,
	// 	domElType
	// })

const mapStateToProps = (state) => ({
  user: state.auth,
  article: state.singleArticle
})

const mapDispatchToProps = (dispatch) => ({
    loadTopStories: () => {
      dispatch(fetchTopStories())
    }
  })

const commentsContainer = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default commentsContainer


     /*<div className="column">
          <nav className="panel">
            <p className="panel-heading">
              <center><strong>Comments</strong></center>
            </p>
          </nav>
      <article className='media'>

        {
              comments.map((comment, index) => (
              <tr key={comments.id}>{comment.text}</tr>
              ))
        }

            <div className='media-content'>
              <form id='formSubmission'>
                <nav className="panel">
                  <p className="control has-icons-left">
                    <textarea className="textarea" placeholder={`${userInfo + ','} what do you think?`}></textarea>
                  </p>
                  <div className="panel-block">
                    { userInfo ?
                            <button className="button is-primary is-outlined is-fullwidth">
                            Submit Comment
                            </button> :
                            <NavLink to={`/LogIn`}>
                            <button className="button is-primary is-outlined is-fullwidth">
                            Log In
                            </button>
                            </NavLink>
                    }
                  </div>
                </nav>
              </form>
            </div>
      </article>
     </div>
    )
}*/
