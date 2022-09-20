import {styles} from './styles';
import {
  edgePadding,
  mapViewProps,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from './utils';
import localImages from '../../utils/localImages';
import React, {useState, useRef, useEffect} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Text,
  View,
  Image,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const mapRef = useRef(null);
  const [loc, setLoc] = useState();
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [destination, setDestination] = useState('');
  const animate = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [showDirection, setShowDirection] = useState(false);

  const showRoute = () => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
    setModalVisible(false);
    showRoute();
  };

  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.position.animateCamera(camera, {duration: 1000});
    }
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
      <View style={styles.searchBar}>
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
          Styles={styles.input}
          icon={localImages.locationPin}
        />
      </View>
      <MapView
        ref={mapRef}
        mapType="standard"
        maxZoomLevel={20}
        minZoomLevel={5}
        {...mapViewProps}
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
          />
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
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
              Styles={styles.direction}
              icon={localImages.gps}
              currentLocation={true}
              currentLocationLabel="Current location"
            />
            <InputAutocomplete
              placeholder="Choose Destination"
              onPlaceSelected={details => {
                onPlaceSelected(details, 'destination');
              }}
              Styles={styles.direction}
              icon={localImages.locationPin}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={traceRoute}>
              <Text style={styles.buttonText}>{'Show Route'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* {distance && duration ? ( */}
      <Animated.View
        style={{
          height: 120,
          width: '100%',
          marginTop: 'auto',
          backgroundColor: 'white',

          transform: [
            {
              translateY: animate.interpolate({
                inputRange: [0, 1],
                outputRange: [120, 0],
              }),
            },
          ],
        }}>
        <View style={styles.distanceView}>
          <Text style={styles.TimeAndDistance}>{`${Math.ceil(
            duration,
          )}min (${distance.toFixed(2)})km`}</Text>
          <Text style={styles.quote}>
            {'Fastest route now due to traffic conditions'}
          </Text>
        </View>
      </Animated.View>
      {/* ) : null} */}
    </View>
  );
}
