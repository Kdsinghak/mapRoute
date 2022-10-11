import {styles} from './styles';
import {onPlaceSelected} from './utils';
import AnimationView from './AnimationView';
import MapSelectModal from './mapSelectModal';
import Geocoder from 'react-native-geocoding';
import localImages from '../../utils/localImages';
import {localStrings} from '../../utils/localStrings';
import {geolocation} from '../../utils/commonFunctions';
import React, {useState, useRef, useEffect} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {edgePadding, showDistance, mapViewProps} from './utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Image, Animated, TouchableOpacity, Alert} from 'react-native';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
export default function Home() {
  // eslint-disable-next-line-no-unused-vars
  const mapRef = useRef(null);
  const [loc, setLoc] = useState({
    name: localStrings.enterSource,
    position: '',
  });
  const MAPkey = useRoute().params;

  const navigation = useNavigation();
  const [origin, setOrigin] = useState('');
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mapType, setmapType] = useState('standard');
  const [description, setdescription] = useState();
  const [destination, setDestination] = useState('');
  const animate = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
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
      MAPkey,
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
    Geocoder.init(MAPkey);
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
        mapType={mapType}
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
            apikey={MAPkey}
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
          MAPkey={MAPkey}
        />
      </View>
      <TouchableOpacity
        style={styles.mapSelectView}
        activeOpacity={0.6}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image source={localImages.layer} style={styles.layerIcon} />
      </TouchableOpacity>

      <MapSelectModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        maptype={setmapType}
      />

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
