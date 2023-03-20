// Copyright 2023 Glowstik Inc. All rights reserved!

/**
* Gets the user's current location using the Geolocation API
* @param {function} onSuccess - Callback function to handle successful retrieval of user's location
* @param {function} onError - Callback function to handle error in retrieving user's location
* @returns {function} Function that gets the user's current location using the Geolocation API
*/

const getCurrentGeoPosition = (onSuccess, onError) => {
	navigator.geolocation.getCurrentPosition(
		(success) => {
			console.log(success.coords)
			onSuccess(success)
		},
		(error) => {
			console.log(error)
			onError(error)
		},
		{enableHighAccuracy: true}
	)
}

export default getCurrentGeoPosition