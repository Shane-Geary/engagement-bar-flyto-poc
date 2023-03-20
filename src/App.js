// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState} from 'react'

import './App.css'

import GlowstikMap from './GlowstikMap'

function App() {

  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <div className='App'>
      <div
        style={{
          opacity: mapLoaded ? 1 : 0,
          transition: '5s'
        }}
      >
        <GlowstikMap mapLoaded={mapLoaded} setMapLoaded={setMapLoaded} />
      </div>
    </div>
  )
}

export default App