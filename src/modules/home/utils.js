export const GOOGLE_MAPS_APIKEY = 'AIzaSyBsMTfGLTXlY9QI__OLaBVetpd7WE8-qWY';
import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';
import {Animated, View} from 'react-native';
import {Dimensions} from 'react-native';
const edgePaddingValue = 40;
export const edgePadding = {
  top: edgePaddingValue,
  left: edgePaddingValue,
  right: edgePaddingValue,
  bottom: edgePaddingValue,
};
export const LATITUDE_DELTA = 0.02;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const mapViewProps = {
  zoomEnabled: true,
  showsTraffic: true,
  scrollEnabled: true,
  rotateEnabled: true,
  loadingEnabled: true,
  zoomTapEnabled: true,
  showsUserLocation: true,
  showsMyLocationButton: true,
};

export const showRoute = animate => {
  Animated.timing(animate, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

export const moveTo = async (position, mapRef) => {
  const camera = await mapRef.current?.getCamera();
  if (camera) {
    camera.center = position;
    mapRef.position.animateCamera(camera, {duration: 1000});
  }
};

export const traceRoute = (
  mapRef,
  origin,
  destination,
  animate,
  setShowDirection,
  setModalVisible,
  showRoute,
) => {
  if (origin && destination) {
    setShowDirection(true);
    mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
  }
  setModalVisible(false);
  showRoute(animate);
};

export const onPlaceSelected = (
  details: GooglePlaceDetail | null,
  flag: 'origin' | 'destination',

  setOrigin,
  setDestination,
  mapRef,
) => {
  const set = flag === 'origin' ? setOrigin : setDestination;
  const position = {
    latitude: details?.geometry?.location?.lat || 0,
    longitude: details?.geometry?.location?.lng || 0,
  };
  set(position);
  moveTo(position, mapRef);
};

const handleModal = () => {
  setModalVisible(!modalVisible);
};


