import React, { Component } from 'react'
import Radar from 'react-d3-radar'
import Carousel from 'nuka-carousel'
import NavLink from 'react-router-dom'

export default function ArticleCarousel({trending}) {
  mixins: [ArticleCarousel.ControllerMixin]
  return (
      <Carousel>
        {
          trending && trending.map(article => (

              <img src={article.urlToImage}/>

          ))
        }
      </Carousel>
    )
}
