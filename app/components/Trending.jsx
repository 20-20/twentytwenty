import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navlink } from 'react-router-dom'

export default function Trending() {
  return (
    <div className="container">
      <p className="title">Trending</p>
      <hr/>
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child box">
              <p className="title">Article Name!</p>
              <p>Twee XOXO tousled, you probably haven't heard of them vexillologist vaporware jean shorts microdosing pork belly kogi shoreditch DIY. Glossier humblebrag adaptogen synth bitters, single-origin coffee farm-to-table yuccie. </p>
            </div>
          </div>
          <div className="tile is-parent is-8 is-vertical">
            <article className="tile is-child box">
              <p className="title">Article Name!</p>
              <p>Brooklyn kinfolk pabst, photo booth helvetica pitchfork tilde snackwave glossier. Dreamcatcher poutine austin chillwave cloud bread tumeric lyft 3 wolf moon YOLO kickstarter. Biodiesel chia portland, fanny pack hell of brunch salvia fashion axe polaroid direct trade edison bulb. Flannel man bun chartreuse, succulents quinoa plaid 8-bit PBR&B actually gastropub. Seitan live-edge chicharrones taiyaki tumeric PBR&B. </p>
            </article >
            <div className="tile">
              <article className="tile is-child box">
                <p className="title">small title</p>
                <p>Fixie chartreuse kombucha etsy, ugh snackwave raclette vegan activated charcoal 90's vinyl biodiesel salvia selfies iPhone. Hashtag venmo pabst, tumeric air plant single-origin coffee thundercats messenger bag viral.</p>
              </article>
              <article className="tile is-child box">
                <p className="title">small title</p>
                <p>Fixie chartreuse kombucha etsy, ugh snackwave raclette vegan activated charcoal 90's vinyl biodiesel salvia selfies iPhone. Hashtag venmo pabst, tumeric air plant single-origin coffee thundercats messenger bag viral.</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
