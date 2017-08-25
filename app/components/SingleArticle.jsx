import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { fetchArticle } from '../reducers/singleArticle'
import { fetchRelatedArticles } from '../reducers/relatedArticles'
import { fetchParagraphs } from '../reducers/paragraphs'
import { fetchComments, addComment } from '../reducers/comments'
import Comments from './Comments.jsx'
import Radar from 'react-d3-radar'
import RadarChart from './radarChart'
import RelatedArticle from './RelatedArticle'
import Comments2 from './Comments2'
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
    const commments = this.props.comments
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
                    <div key={para.index}>
                      <p >{para.text}</p>
                      <br /></div>)
                  )
                }
              </div>
              <div className="column is-multiline">
                <RadarChart singleArticle={singleArticle} />
                 <Comments2 comments={comments}/>
              </div>
            </div>
          }
        </div>
        <hr />
          <div className="container">
            <p className="title">Related Articles on {singleArticle.topics[0]}</p>
            <hr/>
            <div className="columns is-multiline">
             {
               relatedArticles
              .filter(relatedArticle=> relatedArticle.id !== +this.props.match.params.id)
              .sort((a,b)=> a.sentimentScore - b.sentimentScore)
              .map(relatedArticle => <RelatedArticle  key={relatedArticle.id} relatedArticle={relatedArticle}/>)
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