import React, { Component } from 'react'
import Radar from 'react-d3-radar'

export default function RadarChart({singleArticle}) {

  return (
    <Radar
      width={450}
      height={450}
      padding={70}
      domainMax={1}
      highlighted={true}
      onHover={(point) => {
        if (point) {
          console.log('hovered over a data point', point);
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
            key: `${singleArticle.id}`,
            label: 'My Scores',
            values: {
              joy: `${singleArticle.joy}`,
              anger: `${singleArticle.anger}`,
              disgust: `${singleArticle.disgust}`,
              sadness: `${singleArticle.sadness}`,
              fear: `${singleArticle.fear}`,
            },
          },
        ],
      }}
    />
  )
}
