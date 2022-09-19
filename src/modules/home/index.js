import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from './googleMapKey';
import React, {useState, useEffect, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const LATITUDE_DELTA = 0.02;
const ASPECT_RATIO = width / height;
const {width, height} = Dimensions.get('window');
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type InputAutocompleteProps = {
  label: string,
  containrStyle: any,
  placeholder: string,
  onPlaceelected: (details: GooglePlaceDetail | null) => void,
};

function InputAutocomplete({
  label,
  placeholder,
  containrStyle,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <View style={containrStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{textInput: styles.input}}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
      />
    </View>
  );
}
export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [loc, setLoc] = useState({
    latitude: 28.6060756,
    longitude: 77.3597253,
    // latitudeDelta: LATITUDE_DELTA,
    // longitudeDelta: LONGITUDE_DELTA,
  });
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDirection, setShowDirection] = useState(false);
  const mapRef = useRef(null);

  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.position.animateCamera(camera, {duration: 1000});
    }
  };

  const edgePaddingValue = 40;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
  };

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: 'origin' | 'destination',
  ) => {
    const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry?.location?.lat || 0,
      longitude: details?.geometry?.location?.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        mapType="standard"
        maxZoomLevel={20}
        minZoomLevel={5}
        zoomTapEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsTraffic={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={loc}>
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirection && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#02B0FF"
            strokeWidth={7}
            onReady={traceRouteOnReady}
          />
        )}
        <InputAutocomplete
          containrStyle={styles.searchStyle}
          label="Search"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'origin');
          }}
        />
      </MapView>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Origin"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'origin');
          }}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'destination');
          }}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={traceRoute}>
          <Text style={styles.buttonText}>{'Show Route'}</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance:{distance.toFixed(2)}</Text>
            <Text>Duration:{Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: '20%',
  },
  input: {
    fontSize: 15,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#8888',
  },
  button: {
    backgroundColor: '#AFEEEE',
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 4,
    margin: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'blue',
  },
  labelStyle: {
    marginLeft: 12,
    marginTop: 5,
    color: 'black',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  searchStyle: {},
});
