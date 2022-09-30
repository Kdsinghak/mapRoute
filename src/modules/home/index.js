import {styles} from './styles';
import {onPlaceSelected} from './utils';
import AnimationView from './AnimationView';
import Geocoder from 'react-native-geocoding';
import localImages from '../../utils/localImages';
import {localStrings} from '../../utils/localStrings';
import {useNavigation} from '@react-navigation/native';
import {geolocation} from '../../utils/commonFunctions';
import React, {useState, useRef, useEffect} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Image, Animated, TouchableOpacity, Alert} from 'react-native';
import {
  edgePadding,
  showDistance,
  mapViewProps,
  GOOGLE_MAPS_APIKEY,
} from './utils';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const mapRef = useRef(null);
  const [loc, setLoc] = useState({
    name: localStrings.enterSource,
    position: '',
  });

  const navigation = useNavigation();
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [destination, setDestination] = useState('');
  const [markers, setMarkers] = useState([]);
  const [description, setdescription] = useState();
  const animate = useRef(new Animated.Value(0)).current;

  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
      mapRef.current?.fitToCoordinates(args.coordinates, {edgePadding});
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Directions', {
      mapRef,
      Source: setOrigin,
      Destination: setDestination,
    });
    setDestination('');
    setOrigin('');
  };

  useEffect(() => {
    geolocation(setLoc);
  }, []);

  useEffect(() => {
    if (distance && duration) {
      showDistance(animate);
    }
  }, [distance, duration]);

  const onSelect = details => {
    onPlaceSelected(details, 1, setLoc, setDestination, mapRef);
  };

  const handleLongPress = details => {
    setMarkers([{marker: details.nativeEvent.coordinate}]);
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    Geocoder.from(details.nativeEvent.coordinate)
      .then(res => {
        setdescription(res.results[1].formatted_address);
      })
      .catch(err => {
        Alert.alert('not pick up details for this location');
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        minZoomLevel={2}
        maxZoomLevel={25}
        {...mapViewProps}
        mapType={localStrings.Standard}
        style={styles.map}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        onLongPress={handleLongPress}>
        {loc.position && <Marker coordinate={loc.position} />}
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
            key={item => {
              `key_${item.longitude}_${item.latitude}`;
            }}
            tracksInfoWindowChanges={true}
          />
        )}
        {markers &&
          markers.map(item => {
            return (
              <Marker coordinate={item.marker} description={description} />
            );
          })}
        {origin && destination && (
          <MapViewDirections
            strokeWidth={7}
            origin={origin}
            strokeColor="#02B0FF"
            mode={localStrings.mode}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchBar}>
        <InputAutocomplete
          placeholder={localStrings.placeholder}
          onPlaceSelected={onSelect}
          Styles={styles.input}
          icon={localImages.locationPin}
        />
      </View>

      <TouchableOpacity onPress={handleNavigation} style={styles.directionView}>
        <Image source={localImages.direction} style={styles.icon} />
      </TouchableOpacity>
      {distance && duration && origin && destination ? (
        <AnimationView
          duration={duration}
          distance={distance}
          animate={animate}
        />
      ) : null}
    </View>
  );
}
