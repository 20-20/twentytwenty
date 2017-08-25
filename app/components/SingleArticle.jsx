import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { fetchArticle } from '../reducers/singleArticle'
import Comments from './Comments.jsx'
import UpDownVote from './UpDownVote.jsx'
import Radar from 'react-d3-radar'
import RadarChart from './radarChart'

class SingleArticle extends Component {

  componentDidMount() {
    console.log('componentProps', this.props)
    const articleId = +this.props.match.params.id
    this.props.fetchArticle(articleId)
  }

  render() {
    const singleArticle = this.props.singleArticle

    return (
      <div className="container" >
        <hr />
        <div>
          {
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title is-1">{singleArticle && singleArticle.title}</h1>
                <hr />
                <h2 className="subtitle is-3">{singleArticle && singleArticle.publication}</h2>
                <a href={singleArticle && singleArticle.url}>Link to Article</a>
                <figure className="image">
                  <img style={{ maxWidth: '100%', height: 'auto' }} src={singleArticle && singleArticle.urlToImage} className="" />
                </figure>
                {
                  singleArticle.paragraphs && singleArticle.paragraphs.map(para => (
                    <div><p key={para.index}>{para.text}</p><br /></div>)
                  )
                }
              </div>
              <div className="column">
                <RadarChart singleArticle={this.props.singleArticle} />
              {/*<Comments singleArticle={this.props.singleArticle}/>*/}
               <Comments/>
              </div>
            </div>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ trending, comments, singleArticle }) => {
  return {
    trending,
    comments,
    singleArticle
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (articleId) => dispatch(fetchArticle(articleId))
})

const singleArticleContainer = connect(mapStateToProps, mapDispatchToProps)(SingleArticle)

export default singleArticleContainer
