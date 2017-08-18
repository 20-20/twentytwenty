import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

export default function History() {
  return (
    <div className="section" >
      <div className="container">
        <p className="title" id="History">History</p>
        <hr/>
        <div className="columns is-multiline">
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <div className="column is-one-quarter box"><p className="title">content</p></div>
          <hr/>
        </div>
        <hr/>
      </div>
    </div>
  )
}
