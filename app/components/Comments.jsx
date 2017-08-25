import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { NavLink, withRouter } from 'react-router-dom'
import addComment from '../reducers/comments'
//import getSelectionTextAndHighlight from '../../chromeExtension/highlight'

class Comments extends Component {
  constructor(props) {
    super(props)
      // this.getSelectionTextAndHighlight = this.getSelectionTextAndHighlight.bind(this)
  }

  render() {
    console.log("this.props.user", this.props.user)
    let userInfo = this.props.user
    console.log("single article:", this.props.singleArticle)
    return (
     <div className="column">
       {/*{this.getSelectionTextAndHighlight}*/}
      <article className='media'>
       <nav className="panel">
          <nav className="panel">
            <p className="panel-heading">
              <strong>Comments</strong>
            </p>
          </nav>
            <div className='media-content'>
              <form id='formSubmission'>
                <nav className="panel">
                  <p className="control has-icons-left">
                    <textarea className="textarea" placeholder={`${this.props.user.name}, what do you think?`}></textarea>
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
       </nav>
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
