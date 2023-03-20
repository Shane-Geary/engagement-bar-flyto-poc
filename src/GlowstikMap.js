// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState, useRef} from 'react'

import ReactMapGL from 'react-map-gl'
import {Dialog} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'

import getCurrentGeoPosition from './Hooks/useGeolocation'
import useFlyto from './Hooks/useFlyto'
import muiStyles from './Theme/muiStyles'

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
                    setMapLoaded(true)
                    getCurrentGeoPosition((position) => {
                        setGeoCoords({geoLat: position.coords.latitude, geoLong: position.coords.longitude})
                        setGeoReceived(true)
                    })
                }}
                onRender={(e) => {
                    setDialogOpen(true)
                }}
                {...viewport}
            >
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(false)
                    }}
                >
                    {/* Hello World */}
                </Dialog>
            </ReactMapGL>
        </ThemeProvider>
    )
}


export default GlowstikMap