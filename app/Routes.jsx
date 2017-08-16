import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home'
import SingleArticle from './components/SingleArticle'
import Navbar from './components/Navbar'
import { fetchTrending } from './reducers/trending'

class Routes extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (
      <Router>
        <div>
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='/singlearticle' component={SingleArticle} />
        </div>
      </Router>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchTrending())
  }
})

const mapProps = ({ user }) => ({ user})

export default connect(mapProps, mapDispatch)(Routes)
