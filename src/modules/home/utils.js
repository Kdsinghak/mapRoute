import {Dimensions} from 'react-native';
export const GOOGLE_MAPS_APIKEY = 'AIzaSyBsMTfGLTXlY9QI__OLaBVetpd7WE8-qWY';
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
  zoomTapEnabled: true,
  zoomEnabled: true,
  scrollEnabled: true,
  rotateEnabled: true,
  loadingEnabled: true,
  showsUserLocation: true,
  showsMyLocationButton: true,
  showsTraffic: true,
};
