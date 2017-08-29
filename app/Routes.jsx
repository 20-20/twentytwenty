import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SingleArticle from './components/SingleArticle'
import Login from './components/Login'
import Signup from './components/Signup'
import { fetchTopStories } from './reducers/topStories'
import { fetchUsers } from './reducers/users'
import { fetchTrending } from './reducers/trending'

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
            <Route path='/SingleArticle/:id' component={SingleArticle} />
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
    dispatch(fetchUsers())
  }
})

const mapProps = ({ currentUser }) => ({ currentUser })

export default connect(mapProps, mapDispatch)(Routes)
