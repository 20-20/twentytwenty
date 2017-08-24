import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Login from './Login'
import WhoAmI from './WhoAmI'
import addComment from '../reducers/comments'

class Comments extends Component {
  constructor(props) {
    super(props)
      this.renderLoggedIn = this.renderLoggedIn.bind(this)
      this.renderLoggedOut = this.renderLoggedOut.bind(this)
  }

renderLoggedIn(){
  console.log("renderLoggedIn - this.props", this.props)
  console.log("renderLoggedIn - this.props.user", this.props.user)
  return (
    <div className="column">
      <div className='scroll annotate-sidebar' style='display: none'>
        <nav className="panel">
          <p className="panel-heading annotate-header">
            <strong>Comments</strong>
          </p>
        </nav>
        <article className='contentHere'></article>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-48x48 leftBuffer'>
              <img src='http://bulma.io/images/placeholders/128x128.png'/>
            </p>
          </figure>
          <div className='media-content'>
            <form id='formSubmission'>
              <div className='field'>
                <p className='control rightBuffer'>
                  <textarea
                  id='commentSubmission'
                    className='textarea is-size-7'
                    placeholder={`${this.props.user.name}, what do you think?`}
                ></textarea>
                </p>
              </div>
              <div className='field'>
                <p className='control rightBuffer'>
                  <input type={`submit`} className='button is-size-7'/>
                </p>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>

  )
}

renderLoggedOut(){
  return (
    <div className="column">
              <nav className="panel">
                <p className="panel-heading">
                  <center>PLEASE LOG IN TO <br />COMMENT</center>
                </p>
              </nav>
    </div>
  )
}
  render() {
    console.log("this.props.user", this.props.user)
    let userInfo = this.props.user
    return (
      <div>
      { userInfo ? this.renderLoggedIn() : this.renderLoggedOut() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const mapDispatchToProps = function(dispatch) {
  return {
    loadTopStories: () => {
      dispatch(fetchTopStories())
    }
  }
}

const commentsContainer = connect(mapStateToProps, null)(Comments)

export default commentsContainer