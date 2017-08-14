import React, { Component } from 'react'
import Navbar from './Navbar'
import Trending from './Trending'
import TopStories from './TopStories'
import History from './History'
import Community from './Community'
import Global from './Global'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Trending />
        <TopStories />
        <History />
      </div>
    )
  }
}
