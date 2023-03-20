// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState, useRef} from 'react'

import ReactMapGL from 'react-map-gl'

import getCurrentGeoPosition from './Hooks/useGeolocation'
import useFlyto from './Hooks/useFlyto'

import 'mapbox-gl/dist/mapbox-gl.css'

const GlowstikMap = () => {

    const mapRef = useRef(null)

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 1.5
    })

    const [mapLoaded, setMapLoaded] = useState(false)
    const [geoReceived, setGeoReceived] = useState(false)

    const [geoCoords, setGeoCoords] = useState({geoLat: null, geoLong: null})

    useFlyto(mapRef, geoCoords, mapLoaded, geoReceived)

    return (
        <ReactMapGL
            ref={mapRef}
            style={{
                height: visualViewport.height,
                width: visualViewport.width
            }}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle={
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ?
                    process.env.REACT_APP_MAPBOX_STYLE_URL_DARK :
                    process.env.REACT_APP_MAPBOX_STYLE_URL
            }
            projection='globe'
            onMove={(e) => {
                setViewport(e.viewState)
            }}
            onLoad={() => {
                setMapLoaded(true)
                getCurrentGeoPosition((position) => {
                    setGeoCoords({geoLat: position.coords.latitude, geoLong: position.coords.longitude})
                    setGeoReceived(true)
                })
            }}
            {...viewport}
        >

        </ReactMapGL>
    )
}

export default GlowstikMap