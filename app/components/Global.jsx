import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

export default function Trending() {
  return (
    <div className="container">
      <p className="title" id="Global">Global</p>
      <hr/>
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-8 is-verticle">
            <div className="tile is-child box">
              <p className="title">1. Article Name1!</p>
            </div>
            <div className="tile is-child box">
              <p className="title">2. Article Name2!</p>
            </div>
            <div className="tile is-child box">
              <p className="title">3. Article Name3!</p>
            </div>
            <div className="tile is-child box">
              <p className="title">4. Article Name4!</p>
            </div>
            <div className="tile is-child box">
              <p className="title">5. Article Name5!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
