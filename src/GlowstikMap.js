// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState, useRef, useEffect} from 'react'

import getCurrentGeoPosition from './Hooks/useGeolocation'
import useFlyto from './Hooks/useFlyto'
import muiStyles from './Theme/muiStyles'

import mapboxgl from 'mapbox-gl'
import ReactMapGL from 'react-map-gl'
import {Dialog} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'

import 'mapbox-gl/dist/mapbox-gl.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

/**
* React component for rendering a Map using MapboxGL library.
* @param {boolean} mapLoaded - State for tracking whether the map has loaded
* @param {function} setMapLoaded - Function that updates the mapLoaded state
* @returns {function} - React functional component
*/

const GlowstikMap = ({mapLoaded, setMapLoaded}) => {
    // Ref for accessing the MapboxGL instance
    const mapRef = useRef(null)

    // Get viewport dimensions
    const viewportWidth = visualViewport.width
    const viewportHeight = visualViewport.height

    // Set zoom level based on viewport width
    const zoomLevels = viewportWidth > 1200 ? .9 :
                        viewportWidth > 992 ? .5 :
                        viewportWidth > 768 ? .4 :
                        viewportWidth > 576 ? .3 :
                        viewportWidth > 400 ? .2 :
                        .1
    // Set initial state for the viewport
    const [viewport, setViewport] = useState({
        latitude: 34.601928,
        longitude: -102.563212,
        zoom: zoomLevels
    })

    // State for tracking whether geolocation has been received
    const [geoReceived, setGeoReceived] = useState(false)
    // State for tracking whether dialog box is open
    const [dialogOpen, setDialogOpen] = useState(false)

    // State for storing latitude and longitude coordinates
    const [geoCoords, setGeoCoords] = useState({geoLat: null, geoLong: null})

    // Get flyToPreloaded state and handleClick function from the useFlyto hook
    const {flyToPreloaded, handleClick} = useFlyto(mapRef, geoCoords, mapLoaded, geoReceived)

    // Event listener for window resize
    const handleResize = () => {
        const newWidth = viewportWidth
        const newHeight = viewportHeight
        // Set new zoom level based on new viewport width
        const newZoom = newWidth > 1200 ? .9 :
                       newWidth > 992 ? .5 :
                       newWidth > 768 ? .4 :
                       newWidth > 576 ? .3 :
                       newWidth > 400 ? .2 :
                       .1
        // Set the new state of the viewport
        setViewport({ ...viewport, width: newWidth, height: newHeight, zoom: newZoom })
    }

    // Add event listener for window resize on component mount
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    // sx={{
                    //     opacity: 0
                    // }}
                >
                    <div>
                        <button
                            onClick={handleClick}
                        >
                            {flyToPreloaded ? 'Fly To' : 'Preloading...'}
                        </button>
                    </div>
                </Dialog>
            </ReactMapGL>
        </ThemeProvider>
    )
}


export default GlowstikMap