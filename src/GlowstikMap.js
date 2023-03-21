// Copyright 2023 Glowstik Inc. All rights reserved!
import {useState, useRef, useEffect} from 'react'

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
    const [flyToPreloaded, setFlyToPreloaded] = useState(false)

    const [geoCoords, setGeoCoords] = useState({geoLat: null, geoLong: null})

    // useFlyto(mapRef, geoCoords, mapLoaded, geoReceived, flyToEngaged)

    useEffect(() => {
        const flyToAnimation = async () => {
			if(mapLoaded && geoReceived) {
                console.log('preloading')
				mapRef.current.flyTo({
					center: [geoCoords.geoLong, geoCoords.geoLat], // The coordinates returned from geolocation api where we 'fly to'
					zoom: 13, // The zoom level of the map that the flyTo stops on
					preloadOnly: true,
				})
                await mapRef.current.once('idle', () => {
                    console.log('Fly to preloaded')
                    setFlyToPreloaded(true)
                })
			}
		}
		flyToAnimation()
    }, [mapRef, mapLoaded, geoReceived, geoCoords])


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
                        <button
                            onClick={() => {
                                if(flyToPreloaded) {
                                    mapRef.current.flyTo({
                                        center: [geoCoords.geoLong, geoCoords.geoLat], // The coordinates returned from geolocation api where we 'fly to'
                                        zoom: 13, // The zoom level of the map that the flyTo stops on
                                        duration: 4000, // How long the animation takes from start to finish
                                        easing: (t) => { // easing function
                                            return t
                                        }
                                    })
                                }
                            }}
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