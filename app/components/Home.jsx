import React, { Component } from 'react'
import Navbar from './Navbar'
import Trending from './Trending'
import TopStories from './TopStories'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Trending />
        <TopStories />
      </div>
    )
  }
}
