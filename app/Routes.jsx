import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SingleArticle from './components/SingleArticle'
import { fetchTrending } from './reducers/trending'


class Routes extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (
        <div>
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='singleArticle/:id' component={SingleArticle} />
        </div>
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