import {
  Text,
  View,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import React, {useState, useRef} from 'react';
import {GOOGLE_MAPS_APIKEY} from './googleMapKey';
import localImages from '../../utils/localImages';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const LATITUDE_DELTA = 0.02;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function InputAutocomplete({
  placeholder,
  onPlaceSelected,
  styles,
}: InputAutocompleteProps) {
  return (
    <>
      <GooglePlacesAutocomplete
        styles={{textInput: styles}}
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
    </>
  );
}
export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [loc, setLoc] = useState();
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [destination, setDestination] = useState('');
  const [showDirection, setShowDirection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
    setModalVisible(false);
  };

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
      <View
        style={{
          position: 'absolute',
          width: '92%',
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
          borderRadius: 12,
          alignSelf: 'center',
          marginTop: '15%',
          zIndex: 1,
          flexDirection: 'row',
          paddingHorizontal: 8,
        }}>
        <Image
          source={localImages.locationPin}
          style={{
            height: 30,
            width: 30,
            alignSelf: 'center',
          }}
        />
        <InputAutocomplete
          placeholder="search here"
          onPlaceSelected={details => {
            setLoc({
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
              LATITUDE_DELTA,
              LONGITUDE_DELTA,
            });
          }}
          styles={styles.input}
        />
      </View>
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
        {loc && <Marker coordinate={loc} />}
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
            mode="WALKING"
          />
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          position: 'absolute',
          top: '80%',
          right: 10,
          backgroundColor: '#093de8',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          height: '7%',
          width: '15%',
        }}>
        <Image
          source={localImages.direction}
          style={{
            height: 30,
            width: 30,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={styles.searchContainer}>
            <InputAutocomplete
              placeholder="Choose Source"
              onPlaceSelected={details => {
                onPlaceSelected(details, 'origin');
              }}
              styles={styles.direction}
              icon={localImages.gps}
            />
            <InputAutocomplete
              placeholder="Choose Destination"
              onPlaceSelected={details => {
                onPlaceSelected(details, 'destination');
              }}
              styles={styles.direction}
              icon={localImages.locationPin}
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
        </TouchableOpacity>
      </Modal>
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
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 6,
    alignSelf: 'center',
    paddingTop: '10%',
  },
  input: {
    fontSize: 15,
    borderColor: '#8888',
    paddingTop: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#AFEEEE',
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 37,
    alignItems: 'center',
    marginVertical: 10,
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
  direction: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#8888',
    marginTop: 10,
    marginHorizontal: '10%',
  },
});
