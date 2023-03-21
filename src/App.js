// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState} from 'react'

import './App.css'
import GlowstikMap from './GlowstikMap'

import {makeStyles} from 'tss-react/mui'

/**
* This is the main component that contains the state for whether the map has been loaded and renders the GlowstikMap component with the appropriate props.
* @returns {function} - React functional component
*/


function App() {

  // State for tracking whether the map has loaded
  const [mapLoaded, setMapLoaded] = useState(false)

  const {classes} = useStyles({mapLoaded})

  return (
    <div className='App'>
      <div className={classes.appWrapper}>
        <GlowstikMap mapLoaded={mapLoaded} setMapLoaded={setMapLoaded} />
      </div>
    </div>
  )
}

const useStyles = makeStyles()((_, props) => ({
  appWrapper: {
    opacity: props.mapLoaded ? 1 : 0,
    transition: '5s'
  }
}))

export default App