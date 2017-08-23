import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Login from './Login'
import WhoAmI from './WhoAmI'

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
              <nav className="panel">
                <p className="panel-heading">
                  Comments
                </p>

                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  BULMA
                </a>

                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  marksheet
                </a>

                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  minireset.css
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  jgthms.github.io
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-code-fork"></i>
                  </span>
                  daniellowtw/infboard
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-code-fork"></i>
                  </span>
                  mojs
                </a>
                <label className="panel-block">
                  <input type="checkbox" />
                  remember me
                </label>


                <p className="control has-icons-left">

                  {/*<input className="input is-small" type="text" placeholder="What do you think?" />*/}

                  <textarea className="textarea" placeholder={`${this.props.user.name}, what do you think?`}></textarea>
                  <span className="icon is-small is-left">

                  </span>
                </p>


                <div className="panel-block">

                  <button className="button is-primary is-outlined is-fullwidth">
                    Submit Comment
                  </button>
                </div>
              </nav>
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


/*import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Login from './Login'
import WhoAmI from './WhoAmI'

class Comments extends Component {
  constructor(props) {
    super(props)
      this.renderLoggedIn = this.renderLoggedIn.bind(this)
      this.renderLoggedOut = this.renderLoggedOut.bind(this)
  }

renderLoggedIn(){
  return (
     <div className="column">
		      <nav className="panel">
			      <p className="panel-heading">
              Comments
            </p>

            <a className="panel-block is-active">
              <span className="panel-icon">
                <i className="fa fa-book"></i>
              </span>
              HELLOO....
            </a>

			      <form id='formSubmission'>
				    <input className='annotate-text-entry' placeholder='what do you think?' />
			      </form>

		      </nav>
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


const commentsContainer = connect(mapStateToProps, null)(Comments)

export default commentsContainer*/


/*<div className="column is-3">
              <nav className="panel">
                <p className="panel-heading">
                  Comments
                </p>
                <p className="panel-tabs">
                  <a className="is-active">all</a>
                  <a>public</a>
                  <a>private</a>
                </p>
                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  bulma
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  marksheet
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  minireset.css
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-book"></i>
                  </span>
                  jgthms.github.io
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-code-fork"></i>
                  </span>
                  daniellowtw/infboard
                </a>
                <a className="panel-block">
                  <span className="panel-icon">
                    <i className="fa fa-code-fork"></i>
                  </span>
                  mojs
                </a>
                <label className="panel-block">
                  <input type="checkbox" />
                  remember me
                </label>
                <p className="control has-icons-left">
                  <input className="input is-small" type="text" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-search"></i>
                  </span>
                </p>
                <div className="panel-block">
                  <button className="button is-primary is-outlined is-fullwidth">
                    Submit Comment
                  </button>
                </div>
              </nav>
            </div>*/
