import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SingleArticle from './components/SingleArticle'
import { fetchTrending } from './reducers/trending'
import Login from './components/Login'
import Signup from './components/Signup'
import { fetchTopStories } from './reducers/topStories'


class Routes extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
    this.props.fetchTopStories()
  }

  render() {
    return (
      <Router>
        <div>
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route exact path='/SingleArticle/:id' component={SingleArticle} />
            <Route exact path="/LogIn" component={Login} />
            <Route exact path="/Signup" component={Signup} />
        </div>
      </Router>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchTrending())
    dispatch(fetchTopStories())
  }
})

const mapProps = ({ currentUser }) => ({ currentUser })

export default connect(mapProps, mapDispatch)(Routes)
