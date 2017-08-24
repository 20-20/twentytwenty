import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { fetchTopStories } from '../reducers/topStories'
import { NavLink } from 'react-router-dom'

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
            <hr />
            <table className="table is-fullwidth is-striped">

              <tbody>
                {
                  topStories.map((story, index) => (
                    <tr key={story.id}>
                      <td>{index + 1}</td>
                      <td>
                        <NavLink to={`/SingleArticle/${story.id}`} className=''>{story.title}
                        </NavLink>
                      </td>
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

const mapStateToProps = (state) => {
  return {
    topStory: state.topStories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopStories: () => {
      dispatch(fetchTopStories())
    }
  }
}

const topStoriesContainer = connect(mapStateToProps, mapDispatchToProps)(TopStories)

export default topStoriesContainer
