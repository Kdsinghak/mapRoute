import {styles} from './styles';
import {
  moveTo,
  showRoute,
  traceRoute,
  mapViewProps,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
  onPlaceSelected,
  traceRouteOnReady,
  renderRightButton,
} from './utils';
import React, {useState, useRef} from 'react';
import localImages from '../../utils/localImages';
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

  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        minZoomLevel={5}
        maxZoomLevel={20}
        {...mapViewProps}
        mapType="standard"
        style={styles.map}
        initialRegion={loc}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      >
        {loc && <Marker coordinate={loc} />}
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirection && origin && destination && (
          <MapViewDirections
            strokeWidth={7}
            origin={origin}
            strokeColor="#02B0FF"
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            onReady={traceRouteOnReady}
            mode="WALKING"
          />
        )}
      </MapView>
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
      <TouchableOpacity onPress={handleModal} style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}>
        <TouchableOpacity
          onPress={handleModal}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={styles.searchContainer}>
            <InputAutocomplete
              placeholder="Choose Source"
              onPlaceSelected={details => {
                onPlaceSelected(
                  details,
                  'origin',
                  setOrigin,
                  setDestination,
                  mapRef,
                );
              }}
              Styles={styles.direction}
              icon={localImages.gps}
              currentLocation={true}
              currentLocationLabel="Current location"
              renderRightButton
            />
            <InputAutocomplete
              placeholder="Choose Destination"
              onPlaceSelected={details => {
                onPlaceSelected(
                  details,
                  'destination',
                  setOrigin,
                  setDestination,
                  mapRef,
                );
              }}
              Styles={styles.direction}
              icon={localImages.locationPin}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() =>
                traceRoute(
                  mapRef,
                  origin,
                  destination,
                  animate,
                  setShowDirection,
                  setModalVisible,
                  showRoute,
                )
              }>
              <Text style={styles.buttonText}>{'Show Route'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {distance && duration ? (
        <Animated.View
          style={{
            height: 100,
            width: '100%',
            marginTop: 'auto',
            backgroundColor: 'white',
            transform: [
              {
                translateY: animate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
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
      ) : null}
    </View>
  );
}
