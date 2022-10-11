# Google Map Routes

React native map routes helps user to identify routes between 2 points(source to destination), it also shows current location and auto complete features that gives suggestion for nearby places.


## INSTALLATION

You need to install these libararies to use this RCC

1)react-native-maps
https://www.npmjs.com/package/react-native-maps Please visit this site and follow all the mentioned steps for complete steps.
This will help to integrate MAPS in your project.

2)react-native-google-places-autocomplete
https://www.npmjs.com/package/react-native-google-places-autocomplete Customizable Google Places autocomplete component for iOS and Android React-Native apps

3)react-native-maps-directions
https://www.npmjs.com/package/react-native-maps-directions Directions component for react-native-maps – Draw a route between two coordinates, powered by the Google Maps Directions API

4)react-native-geolocation-service - https://www.npmjs.com/package/react-native-geolocation-service
This library is created in an attempt to fix the location timeout issue on android with the react-native's current implementation of Geolocation API. This library tries to solve the issue by using Google Play Service's new FusedLocationProviderClient API, which Google strongly recommends over android's default framework location API. It automatically decides which provider to use based on your request configuration and also prompts you to change the location mode if it doesn't satisfy your current request configuration.

5)react-native-permissions - https://www.npmjs.com/package/react-native-permissions
A unified permissions API for React Native on iOS, Android and Windows.

6)react-native-geocoding - https://www.npmjs.com/package/react-native-geocoding
A geocoding module for React Native to transform a description of a location (i.e. street address, town name, etc.) into geographic coordinates (i.e. latitude and longitude) and vice versa.
This module uses Google Maps Geocoding API and requires an API key for purposes of quota management. Please check this link out to obtain your API key.

7)react-native-modal - https://www.npmjs.com/package/react-native-modal
An enhanced, animated, customizable React Native modal.

The goal of react-native-modal is expanding the original React Native <Modal> component by adding animations, style customization options, and new features, while still providing a simple API.

## enviroment.js
This file is developed out every folder loke app.js and contains a google Api key whis is very basic and helpful for running the project 
google Api key is used in different spaces like it use in googleAutoPlacecomplete file and in MapViewDirections components which requires this api key.

  
  
## MapView props

MapView is a component which can view a map in our UI. 

| Props             | Type                         | Description                            |
| ----------------- | ---------------------------- | --------------------------- 
| ref |any |it gives a reference of MapView|
|style|object| give a styling of map|
|mapType|String|The map type to be displayed.standard: standard road map (default)none: no map Note Not available on MapKitsatellite: satellite viewhybrid: satellite view with roads and points of interest overlayedterrain: topographic viewmutedStandard: more subtle, makes markers/lines pop more (iOS 11.0+ only)|
|provider|string|The map framework to use.Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).|
|onLongPress|function : { coordinate: LatLng, position: Point }|Callback that is called when user makes a "long press" somewhere on the map.|
|zoomEnabled|Boolean|If false the user won't be able to pinch/zoom the map.|
|minZoomLevel|Number|Minimum zoom value for the map, must be between 0 and 20|
|maxZoomLevel|Number|Maximum zoom value for the map, must be between 0 and 20|
|showsTraffic|Boolean|A Boolean value indicating whether the map displays traffic information.|
|scrollEnabled|Boolean|If false the user won't be able to change the map region being displayed.|
|rotateEnabled|Boolean|If false the user won't be able to pinch/rotate the map.|
|loadingEnabled|Boolean|If true a loading indicator will show while the map is loading.|
|zoomTapEnabled|Boolean|If false the user won't be able to double tap to zoom the map. Note: But it will greatly decrease delay of tap gesture recognition. Note: Google Maps on iOS only|
|showsUserLocation|Boolean|If true the users location will be shown on the map. NOTE: You need runtime location permissions prior to setting this to true, otherwise it is going to fail silently! Checkout the excellent react-native-permissions for this.|
|showsMyLocationButton|Boolean|If false hide the button to move map to the current user's location.|


##  MapViewDirections props

| Props             | Type                         | Description                  |
| ----------------- | ---------------------------- | --------------------------- 
|strokeWidth|number|to specify the width os the stroke (path)|
|origin|LatLng or String|The destination location to start routing to.|
|strokeColor|string|to change the color of path|
|mode|String|Which transportation mode to use when calculating directions. Allowed values are "DRIVING", "BICYCLING", "WALKING", and "TRANSIT". (See here for more info).|
|destination|LatLng or String|The destination location to start routing to.|
|apikey|String	|Your Google Maps API Key (request one here; if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Directions API for that key using the Google API Console by hitting the “Enable APIs and Services“ button).|
|onReady|function : { distance: Number, duration: Number, coordinates: [], fare: Object, waypointOrder: [[]] }|Callback that is called when the routing has succesfully finished. Note: distance returned in kilometers and duration in minutes.|


##  InputAutoComplete props

| Props             | Type                         | Description                   |
| ----------------- | ---------------------------- | --------------------------- 
|icon|string|path of the icon|
|Styles|object|style of the text input|
|placeholder|string|placeholder of the textInput|
|onPlaceSelected|function : return->  object |return a details of the selected place  |
|MAPkey|string|google map Api key|
