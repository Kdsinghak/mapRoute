import {styles} from './styles';
import {
  mapViewProps,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
  showRoute,
} from './utils';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import localImages from '../../utils/localImages';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Image, Animated, TouchableOpacity, Text} from 'react-native';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
import AnimationView from './AnimationView';
export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [loc, setLoc] = useState();
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [destination, setDestination] = useState('');
  const animate = useRef(new Animated.Value(0)).current;

  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Directions', {
      mapRef,
      Source: setOrigin,
      Destination: setDestination,
    });
  };

  useEffect(() => {
    console.log('called');
    if (distance && duration) {
      showRoute(animate);
    }
  }, [distance, duration]);

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
            draggable
            coordinate={loc}
            onDragEnd={points => setLoc(points.nativeEvent.coordinate)}
          />
        )}
        {origin && (
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={points => setOrigin(points.nativeEvent.coordinate)}
          />
        )}
        {destination && (
          <Marker
            draggable
            coordinate={destination}
            onDragEnd={points => setDestination(points.nativeEvent.coordinate)}
          />
        )}
        {origin && destination && (
          <MapViewDirections
            mode="WALKING"
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
      <TouchableOpacity onPress={handleNavigation} style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
      </TouchableOpacity>
      {distance && duration ? (
        <AnimationView
          duration={duration}
          distance={distance}
          animate={animate}
        />
      ) : null}
    </View>
  );
}
