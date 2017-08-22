import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { render } from 'react-dom'
import { fetchTopStories } from '../reducers/topStories'

class TopStories extends Component {
  componentDidMount() {
    this.props.loadTopStories()
  }

  render() {
    const topStories = this.props.topStory
    return (
      <div>
        <div className="section" >
          <div className="container">
          <p className="title" id="TopStories">Top Stories</p>
          <hr/>
          <table className="table is-fullwidth is-striped">

            <tbody>
              {
                topStories.map((story, index) => (
                  <tr key={story.id}>
                    <td>{index+1}</td>
                    <td>{story.title}</td>
                    <td>{story.author}</td>
                    <td>Comments: {story.commentsCount}</td>
                    <td>Engagement: {story.engagement}</td>
                  </tr>
                  )
                )
              }
            </tbody>

          </table>
          </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = function(state) {
  console.log('state.topStories', state.topStories)
  return {
    topStory: state.topStories
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    loadTopStories: () => {
      dispatch(fetchTopStories())
    }
  }
}

const topStoriesContainer = connect(mapStateToProps, mapDispatchToProps)(TopStories)

export default topStoriesContainer
