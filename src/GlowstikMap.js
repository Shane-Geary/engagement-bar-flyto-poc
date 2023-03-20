// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState, useRef} from 'react'

import mapboxgl from 'mapbox-gl'
import ReactMapGL from 'react-map-gl'
import {Dialog} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'

import getCurrentGeoPosition from './Hooks/useGeolocation'
import useFlyto from './Hooks/useFlyto'
import muiStyles from './Theme/muiStyles'

import 'mapbox-gl/dist/mapbox-gl.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const GlowstikMap = ({mapLoaded, setMapLoaded}) => {

    const mapRef = useRef(null)

    const [viewport, setViewport] = useState({
        latitude: 34.601928,
        longitude: -102.563212,
        zoom: .9
    })

    const [geoReceived, setGeoReceived] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const [geoCoords, setGeoCoords] = useState({geoLat: null, geoLong: null})

    useFlyto(mapRef, geoCoords, mapLoaded, geoReceived)


    return (
        <ThemeProvider theme={muiStyles}>
            <ReactMapGL
                ref={mapRef}
                style={{
                    width: visualViewport.width,
                    height: visualViewport.height
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
                    setDialogOpen(true)
                    setMapLoaded(true)
                    getCurrentGeoPosition((position) => {
                        setGeoCoords({geoLat: position.coords.latitude, geoLong: position.coords.longitude})
                        setGeoReceived(true)
                    },
                    () => {
                        setGeoCoords({geoLat: 39.7448684, geoLong: -104.9876661})
                        setGeoReceived(true)
                    }
                    )
                }}
                {...viewport}
            >
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(false)
                    }}
                    sx={{
                        // opacity: 0
                    }}
                >
                    <div>
                        {/* Hello World */}
                    </div>
                </Dialog>
            </ReactMapGL>
        </ThemeProvider>
    )
}


export default GlowstikMap