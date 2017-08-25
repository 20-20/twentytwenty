import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { NavLink, withRouter } from 'react-router-dom'
import addComment from '../reducers/comments'
// import getSelectionTextAndHighlight from '../../chromeExtension/highlight'

class Comments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let userInfo = this.props.user ? this.props.user.name : ''
    return (
     <div className="column">
       {/*{this.getSelectionTextAndHighlight}*/}
       {/*{console.log("single article:", this.props.singleArticle.id)}*/}
          <nav className="panel">
            <p className="panel-heading">
              <center><strong>Comments</strong></center>
            </p>
          </nav>
      <article className='media'>
        {
                  this.props.singleArticle.comments.map((comments, index) => (
                    <tr key={comments.id}>
                     </tr>
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
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  singleArticle: state.singleArticle
})

const commentsContainer = connect(mapStateToProps, null)(Comments)

export default commentsContainer
