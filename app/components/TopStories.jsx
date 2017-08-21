import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'
import { render } from 'react-dom'
import { fetchTopStories } from '../reducers/topStories'

class TopStories extends Component {
  componentDidMount() {
    this.props.loadTopStories()
  }

  render() {
    const topStories = this.props.topStory
    let index = 1
    return (
      <div>
        <div className="section" >
          <div className="container">
          <p className="title" id="TopStories">Top Stories</p>
          <hr/>
          <table className="table is-fullwidth is-striped">

            <tbody>
              {
                // OB/ET: you have access to index as the second argument to the map callback
                topStories.map((story) => (
                  <tr key={story.id}>
                    <td>{index++}</td>
                    <td>{story.title}</td>
                    <td>{story.author}</td>
                    <td>Comments</td>
                    <td>Views</td>
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
