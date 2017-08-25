import React, { Component } from 'react'
import Radar from 'react-d3-radar'

export default function RadarChart({singleArticle, width, height, padding }) {

  return (
    <Radar
      width={width || 450} 
      height={height || 450}
      padding={padding || 70}
      domainMax={1}
      highlighted={null}
      onHover={(point) => {
        if (point) {
          console.log('hovered over a data point');
        } else {
          console.log('not over anything');
        }
      }}
      data={{
        variables: [
          { key: 'joy', label: 'Joy' },
          { key: 'anger', label: 'Anger' },
          { key: 'disgust', label: 'Disgust' },
          { key: 'sadness', label: 'Sadness' },
          { key: 'fear', label: 'Fear' }
        ],
        sets: [
          {
            key: 'me',
            label: 'My Scores',
            values: {
              joy: `${singleArticle.joy}`,
              anger: `${singleArticle.anger}`,
              disgust: `${singleArticle.disgust}`,
              sadness: `${singleArticle.sadness}`,
              fear: `${singleArticle.fear}`,
            },
          }
        ],
      }}
    />
  )
}
