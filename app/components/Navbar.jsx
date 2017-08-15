import React, { Component } from 'react'
import Login from './Login'
import WhoAmI from './WhoAmI'

export default function Navbar({ user }) {
  return (
    <div className="container" >
      <div style={{ position: `${'fixed'}`, zIndex: `${'2'}` }}>
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://bulma.io" >
              Twenty Twenty
            </a>

            <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
              <span className="icon" style={{ color: '#333' }}>
                <i className="fa fa-github"></i>
              </span>
            </a>

            <a className="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
              <span className="icon" style={{ color: '#55acee' }}>
                <i className="fa fa-twitter"></i>
              </span>
            </a>

            <div className="navbar-burger burger" data-target="navMenubd-example">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="navMenubd-example" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item " href="http://bulma.io/expo/">
                Trending
              </a>
              <a className="navbar-item " href="http://bulma.io/love/">
                Top Stories
              </a>
              <a className="navbar-item " href="http://bulma.io/love/">
                Global Conversation
              </a>
              <a className="navbar-item " href="http://bulma.io/love/">
                History
              </a>
              <a className="navbar-item " href="http://bulma.io/love/">
                Community
              </a>
            </div>

            <div className="navbar-end">
              <a className="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
                <span className="icon" style={{ color: '#333' }}>
                  <i className="fa fa-github"></i>
                </span>
              </a>
              <a className="navbar-item is-hidden-desktop-only" href="https://twitter.com/jgthms" target="_blank">
                <span className="icon" style={{ color: '#55acee' }}>
                  <i className="fa fa-twitter"></i>
                </span>
              </a>
              <div className="navbar-item">
                <div className="field is-grouped">
                  <div className="control">
                    <div className="button is-primary" >
                      <span className="icon">
                        <i className="fa fa-download"></i>
                      </span>
                      {user ? <WhoAmI /> : <Login />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

