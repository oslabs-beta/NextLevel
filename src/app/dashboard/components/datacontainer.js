import React from 'react'
import BuildTimeChart from './buildtimecontainer'
import WebVitalsChart from './webvitalschart'
import APIKey from './APIkey'

const DataContainer = () => {
  return (
    <div id='dataContainer'>
      <h2>Data Container</h2>
        <APIKey />
        <WebVitalsChart />
        <BuildTimeChart />
      </div>
  )
}

export default DataContainer