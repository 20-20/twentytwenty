import React, { Component } from 'react'
import Login from './Login'
import WhoAmI from './WhoAmI'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/auth'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.renderLoginSignup = this.renderLoginSignup.bind(this)
    this.renderLogout = this.renderLogout.bind(this)
  }

  render() {
    return (
      <div className="container" >
        <nav className="navbar has-shadow">
          <div className="navbar-brand is-info">
            <NavLink className="navbar-item" to={'/'} >
              Twenty Twenty
            </NavLink>
            <NavLink className="navbar-item is-hidden-desktop" to={'https://github.com/20-20/twentytwenty'} target="_blank">
              <span className="icon" style={{ color: '#333' }}>
                <i className="fa fa-github"></i>
              </span>
            </NavLink>

            <div className="navbar-burger burger" data-target="navMenubd-example">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item " href="/#Trending">
                Trending
              </a>
              <a className="navbar-item " href="/#TopStories">
                Top Stories
              </a>
              <a className="navbar-item " href="#GlobalConversation">
                Global Conversation
              </a>
              <a className="navbar-item " href="/#History">
                History
              </a>
              <a className="navbar-item " href="#Community">
                Community
              </a>
            </div>

            <div className="navbar-end">
              <a className="navbar-item is-hidden-desktop-only" href="https://github.com/20-20/twentytwenty" target="_blank">
                <span className="icon" style={{ color: '#333' }}>
                  <i className="fa fa-github"></i>
                </span>
              </a>
              {this.props.user ? this.renderLogout() : this.renderLoginSignup()}
            </div>
          </div>
        </nav>
      </div>
    )
  }

  renderLoginSignup() {
    return (
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <NavLink to={`/SignUp`} className="button is-info" >
              <span>Sign Up</span>
            </NavLink>
          </p>
          <p className="control">
            <NavLink to={`/LogIn`} className="button is-info" >
              Log In
            </NavLink>
          </p>
        </div>
      </div>
    )
  }

  renderLogout() {
    const name = this.props.user.name || this.props.user.email
    return (
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <button
              className="button is-info"
              onClick={this.props.logout}>
              logout {name}
            </button>
          </p>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.auth
})

const mapDispatch = ({ logout })

// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logOutUser())
//     // history.push('/'); // removed to demo logout instant re-render
//   }
// })

export default withRouter(connect(mapState, mapDispatch)(Navbar))
