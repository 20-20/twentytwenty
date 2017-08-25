import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { fetchArticle } from '../reducers/singleArticle'
import { fetchRelatedArticles } from '../reducers/relatedArticles'
import { fetchParagraphs } from '../reducers/paragraphs'
import { fetchComments, addComent } from '../reducers/comments'
import Comments from './Comments.jsx'
import Radar from 'react-d3-radar'
import RadarChart from './radarChart'
import RelatedArticle from './RelatedArticle'

class SingleArticle extends Component {

  componentDidMount() {
    const articleId = +this.props.match.params.id
    this.props.fetchArticle(articleId)
    this.props.fetchRelatedArticles(articleId)
    this.props.fetchParagraphs(articleId)
    this.props.fetchComments(articleId)
  }

  render() {
    const singleArticle = this.props.singleArticle
    const paragraphs = this.props.paragraphs
    const comments = this.props.comments
    const relatedArticles = this.props.relatedArticles

    return (
      singleArticle &&
      <div className="container" >
        <hr />
        <div>
          {
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title is-1">{singleArticle.title}</h1>
                <hr />
                <h2 className="subtitle is-3">{singleArticle.publication}</h2>
                <a href={singleArticle.url}>Link to Article</a>
                <figure className="image">
                  <img style={{ maxWidth: '100%', height: 'auto' }} src={singleArticle.urlToImage} className="" />
                </figure>
                {
                  paragraphs.map((para, index) => (
                    <div><p key={para.index}>{para.text}</p><br /></div>)
                  )
                }
              </div>
              <div className="column is-multiline">
                <RadarChart singleArticle={singleArticle} /> }
                {/* <Comments singleArticle={this.props.singleArticle} /> */}
              </div>
            </div>
          }
        </div>
        <hr />
          <div className="container">
            <p className="title">Related Articles</p>
            <hr/>
            <div className="columns is-multiline">
             {
              relatedArticles.map(article =>
                <RelatedArticle article={article}/>
              )
            }
            <hr/>
          </div>
          <hr/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, paragraphs, singleArticle, relatedArticles }) => {
  return {
    comments,
    paragraphs,
    singleArticle,
    relatedArticles
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
  fetchRelatedArticles: (articleId) => dispatch(fetchRelatedArticles(articleId)),
  fetchParagraphs: (articleId) => dispatch(fetchParagraphs(articleId)),
  fetchComments: (articleId) => dispatch(fetchComments(articleId)),
  addComment: (articleId, paragraphId) => dispatch(addComment(articleId, paragraphId))
})

const singleArticleContainer = connect(mapStateToProps, mapDispatchToProps)(SingleArticle)

export default singleArticleContainer
