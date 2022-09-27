import {styles} from './styles';
import {
  mapViewProps,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
  showRoute,
} from './utils';
import React, {useState, useRef} from 'react';
import localImages from '../../utils/localImages';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Image, Animated, TouchableOpacity, Text} from 'react-native';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [loc, setLoc] = useState();
  // const navigation = useNavigation();
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [destination, setDestination] = useState('');
  const animate = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [showDirection, setShowDirection] = useState(false);

  const traceRouteOnReady = args => {
    console.log('345678iolkmjnhgfdsaxc', args);
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
        minZoomLevel={2}
        maxZoomLevel={25}
        {...mapViewProps}
        mapType="standard"
        style={styles.map}
        initialRegion={loc}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      >
        {loc && (
          <Marker
            coordinate={loc}
            draggable
            onDragEnd={points => setLoc(points.nativeEvent.coordinate)}
          />
        )}
        {origin && (
          <Marker
            coordinate={origin}
            draggable
            onDragEnd={points => setOrigin(points.nativeEvent.coordinate)}
          />
        )}
        {destination && (
          <Marker
            coordinate={destination}
            draggable
            onDragEnd={points => setDestination(points.nativeEvent.coordinate)}
          />
        )}
        {origin && destination && (
          <MapViewDirections
            strokeWidth={7}
            origin={origin}
            strokeColor="#02B0FF"
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            onReady={traceRouteOnReady}
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Directions', {
            mapRef,
            Source: setOrigin,
            Destination: setDestination,
          });
        }}
        style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
      </TouchableOpacity>
      {distance && duration
        ? (showRoute(animate),
          (
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
          ))
        : null}
    </View>
  );
}
