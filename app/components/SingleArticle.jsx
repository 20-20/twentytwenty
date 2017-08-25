import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { fetchArticle } from '../reducers/singleArticle'
import Comments from './Comments.jsx'
import Radar from 'react-d3-radar'
import RadarChart from './radarChart'
import { fetchArticlesByTopics, resetArticlesByTopics } from '../reducers/topics'
import RelatedArticle from './RelatedArticle'

class SingleArticle extends Component {

  componentDidMount() {
    const articleId = +this.props.match.params.id
    this.props.fetchArticle(articleId)
  }

  mostReleventTopic() {
    const mostReleventTopic = this.props.singleArticle.topics.reduce((acc, topic) => {
      return (acc.relevances.score > topic.relevances.score) ? acc : topic
    })
    this.props.fetchArticlesByTopics(mostReleventTopic.name)
  }

  componentWillUnmount() {
    this.props.resetArticlesByTopics()
  }

  render() {
    const singleArticle = this.props.singleArticle
    this.props.singleArticle && !this.props.topics.length && this.mostReleventTopic()

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
                  singleArticle && singleArticle.paragraphs.map(para => (
                    <div><p key={para.index}>{para.text}</p><br /></div>)
                  )
                }
              </div>
              <div className="column is-multiline">
                {singleArticle && <RadarChart singleArticle={this.props.singleArticle} /> }
                <Comments singleArticle={this.props.singleArticle} />
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
              this.props.topics.length && this.props.topics.map(topic =>
                <RelatedArticle topic={topic}/>
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

const mapStateToProps = ({ trending, comments, singleArticle, topics }) => {
  return {
    trending,
    comments,
    singleArticle,
    topics
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
  fetchArticlesByTopics: (topic) => dispatch(fetchArticlesByTopics(topic)),
  resetArticlesByTopics: () => dispatch(resetArticlesByTopics())
})

const singleArticleContainer = connect(mapStateToProps, mapDispatchToProps)(SingleArticle)

export default singleArticleContainer
