import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

function SingleArticle({trending, comments, singleArticle, componentProps}) {

  let article = singleArticle && singleArticle.id

  return (
    <div className="container" >
      <p className="title">Trending</p>
      <hr />
      <div>
        {trending.length &&
          <div className="columns">
            <div className="column is-8">
              <h1 className="title is-1">{article && trending[article].title}</h1>
              <hr/>
              <h2 className="subtitle is-3">{article && trending[article].publication}</h2>
              <a href={article && trending[article].url}>Link to Article</a>
              <figure className="image is-square">
                <img src={article && trending[article].urlToImage} className=""/>
              </figure>
              {article && trending[article].body.split('\n').map((par, index) => (
                <p key={index}>{par}<br/></p>
              ))
              }
            </div>
            <div className="column is-3">
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
                  <input type="checkbox"/>
                  remember me
                </label>
                <p className="control has-icons-left">
                  <input className="input is-small" type="text"/>
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
            </div>
          </div>
         }
      </div>
    </div>
  )
}

const mapState = ({trending, comments, singleArticle}, componentProps) => ({
  trending, 
  comments, 
  singleArticle: trending.find(article => article.id === +componentProps.match.params.id) 
})

export default connect(mapState)(SingleArticle)
