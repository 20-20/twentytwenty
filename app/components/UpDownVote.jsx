import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'

class UpDownVote extends Component {
  constructor(props) {
    super(props)
      this.upVote = this.upVote.bind(this)
      this.downVote = this.downVote.bind(this)
  }

  upVote(){
   console.log("upVote Clicked")
  }
  downVote(){
   console.log("downVote Clicked")
  }

  render() {
    return (
      <div>
              <button
                onClick={this.upVote}
                type="submit"
                className="btn btn-default">
                UP VOTE
              </button>
              <button
                onClick={this.downVote}
                type="submit"
                className="btn btn-default">
                DOWN VOTE
              </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const upDownVoteContainer = connect(mapStateToProps, null)(UpDownVote)

export default upDownVoteContainer
