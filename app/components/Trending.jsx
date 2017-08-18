import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Trending({trending}) {
  return (
    <div className="section">
      <div className="container" >
        <p className="title" id="Trending">Trending</p>
        <hr />
        <div>
          {trending.length &&
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4" >
                <NavLink to={`/SingleArticle/${trending[0].id}`} id={trending[0].id} className="tile is-child box notification is-primary" style={{ backgroundImage: `linear-gradient(black, transparent), url('${trending[0].urlToImage}')`, backgroundPosition: 'center' }}>
                  <div style={{alignSelf: 'flex-end'}}>
                  <p className='title' style={{alignSelf: 'flex-end'}}>{trending[0].title}</p>
                  <p style={{alignSelf: 'flex-end'}}>{trending[0].body.slice(0, 250)}...</p>
                  </div>
              </NavLink>
            </div>
            <div className="tile is-parent is-8 is-vertical">
              <NavLink to={`/SingleArticle/${trending[1].id}`} id={trending[1].id} className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(black, transparent), url('${trending[1].urlToImage}')`, backgroundPosition: 'center' }}>
                <p className="title">{trending[1].title}</p>
                <p>{trending[1].body.slice(0, 250)}...</p>
              </NavLink>
              <div className="tile">
                <NavLink to={`/SingleArticle/${trending[2].id}`} id={trending[2].id} className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(black, transparent), url('${trending[2].urlToImage}')`, backgroundPosition: 'center' }}>
                  <p className="title">{trending[2].title}</p>
                  <p>{trending[2].body.slice(0, 250)}...</p>
                </NavLink>
                <NavLink to={`/SingleArticle/${trending[3].id}`} id={trending[3].id} className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(black, transparent), url('${trending[3].urlToImage}')`, backgroundPosition: 'center' }}>
                  <p className="title">{trending[3].title}</p>
                  <p>{trending[3].body.slice(0, 250)}...</p>
                </NavLink>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

const mapState = ({trending}) => ({trending})

export default connect(mapState)(Trending)
