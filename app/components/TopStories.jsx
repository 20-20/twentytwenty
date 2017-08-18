import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

export default function TopStories() {
  return (
    <div className="section" >
      <div className="container">
        <p className="title" id="TopStories">Top Stories</p>
        <hr/>

        <table className="table is-fullwidth is-striped">
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <h6>Article Title</h6>
                <p>Tom Jones</p>
              </td>
              <td>Comments</td>
              <td>Views</td>

            </tr>
            <tr>
              <td>2</td>
              <td>
                <h4>A good Article Title</h4>
                <p>Sal thingy-face</p>
              </td>
              <td>Comments</td>
              <td>Views</td>

            </tr>
            <tr>
              <td>3</td>
              <td>
                <h6>Another Article Title</h6>
                <p>Author McWriter</p>
              </td>
              <td>Comments</td>
              <td>Views</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
