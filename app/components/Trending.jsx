import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

function Trending({trending}) {
  return (
    <div className="container" >
      <p className="title">Trending</p>
      <hr />
      <div>
        {trending.length && <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
              <div className="tile is-child box notification is-primary" style={{ backgroundImage: `linear-gradient(transparent, black), url('${trending[0].urlToImage}')`, backgroundPosition: `${'center'}`, alignItems: `${'flex-end'}` }}>  
                <p className="title">{trending[0].title}</p>
                <p>{trending[0].body.slice(0, 250)}...</p>
            </div>
          </div>
          <div className="tile is-parent is-8 is-vertical">
            <div className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(transparent, black), url('${trending[1].urlToImage}')`, backgroundPosition: `${'center'}` }}>
              <p className="title">{trending[1].title}</p>
              <p>{trending[1].body.slice(0, 250)}...</p>
            </div>
            <div className="tile">
              <article className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(transparent, black), url('${trending[2].urlToImage}')`, backgroundPosition: `${'center'}` }}>
                <p className="title">{trending[2].title}</p>
                <p>{trending[2].body.slice(0, 250)}...</p>
              </article>
              <article className="tile is-child notification is-primary box" style={{ backgroundImage: `linear-gradient(transparent, black), url('${trending[3].urlToImage}')`, backgroundPosition: `${'center'}` }}>
                <p className="title">{trending[3].title}</p>
                <p>{trending[3].body.slice(0, 250)}...</p>
              </article>
            </div>
          </div>
         </div>
         }
      </div>
    </div>
  )
}

const mapState = ({trending}) => ({trending})

export default connect(mapState)(Trending)
