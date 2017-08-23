import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { fetchArticle } from '../reducers/singleArticle'
import Comments from './Comments.jsx'
import Radar from 'react-d3-radar'

class SingleArticle extends Component{

  componentDidMount() {
    console.log('componentProps', this.props)
    const articleId = +this.props.match.params.id
    this.props.fetchArticle(articleId)
  }

  render(){
    const singleArticle = this.props.singleArticle

    return (
      <div className="container" >
        <hr />
        <div>
          {
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title is-1">{ singleArticle && singleArticle.title}</h1>
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
              <Comments />
            </div>
          }
        </div>
        <Radar
          width={500}
          height={500}
          padding={70}
          domainMax={1}
          highlighted={null}
          onHover={(point) => {
            if (point) {
              console.log('hovered over a data point');
            } else {
              console.log('not over anything');
            }
          }}
          data={{
            variables: [
              { key: 'joy', label: 'Joy' },
              { key: 'anger', label: 'Anger' },
              { key: 'disgust', label: 'Disgust' },
              { key: 'sadness', label: 'Sadness' },
              { key: 'fear', label: 'Fear' }
            ],
            sets: [
              {
                key: 'me',
                label: 'My Scores',
                values: {
                  joy: `${singleArticle.joy}`,
                  anger: `${singleArticle.anger}`,
                  disgust: `${singleArticle.disgust}`,
                  sadness: `${singleArticle.sadness}`,
                  fear: `${singleArticle.fear}`,
                },
              }
            ],
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = function({ trending, comments, singleArticle }) {
  return {
    trending,
    comments,
    singleArticle
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: ( articleId ) => dispatch(fetchArticle( articleId ))
})

const singleArticleContainer = connect(mapStateToProps, mapDispatchToProps)(SingleArticle)

export default singleArticleContainer
