import {styles} from './styles';
import {
  mapViewProps,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from './utils';
import React, {useState, useRef} from 'react';
import localImages from '../../utils/localImages';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Image, Animated, TouchableOpacity} from 'react-native';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Directions', {
            mapRef,
            animate,
            Source: setOrigin,
            Destination: setDestination,
          });
        }}
        style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
