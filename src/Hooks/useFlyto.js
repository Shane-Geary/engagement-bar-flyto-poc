// Copyright 2023 Glowstik Inc. All rights reserved!
import {useEffect, useState} from 'react'

const useFlyto = (mapRef, geoCoords, mapLoaded, geoReceived) => {
    const [flyToPreloaded, setFlyToPreloaded] = useState(false)

    useEffect(() => {
        const flyToAnimation = async () => {
            if (mapLoaded && geoReceived) {
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

  const handleClick = () => {
    if (flyToPreloaded) {
        mapRef.current.flyTo({
            center: [geoCoords.geoLong, geoCoords.geoLat], // The coordinates returned from geolocation api where we 'fly to'
            zoom: 13, // The zoom level of the map that the flyTo stops on
            duration: 4000, // How long the animation takes from start to finish
            easing: (t) => { // easing function
                return t
            },
        })
        }
    }

  return {flyToPreloaded, handleClick}
}

export default useFlyto