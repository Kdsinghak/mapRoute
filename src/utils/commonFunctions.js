import Geolocation from 'react-native-geolocation-service';
import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {Alert} from 'react-native';
export const LATITUDE_DELTA = 0.02;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const geolocation = setLoc => {
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation(setLoc);
      subscribeLocationLocation(setLoc);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation(setLoc);
          subscribeLocationLocation(setLoc);
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  requestLocationPermission();
  return () => {
    Geolocation.clearWatch(watchID);
  };
};

const getOneTimeLocation = setLoc => {
  Geolocation.getCurrentPosition(
    //Will give you the current location
    details => {
      //getting the Longitude from the location json

      let position = {
        latitude: details.coords.latitude,
        longitude: details.coords.longitude,
        LATITUDE_DELTA,
        LONGITUDE_DELTA,
      };
      setLoc({
        name: 'current location',
        position,
      });
    },
    error => {
      Alert.alert('cannot get Location');
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000,
    },
  );
};

const subscribeLocationLocation = setLoc => {
  watchID = Geolocation.watchPosition(
    details => {
      //getting the Longitude from the location json

      let position = {
        latitude: details.coords.latitude,
        longitude: details.coords.longitude,
        LATITUDE_DELTA,
        LONGITUDE_DELTA,
      };
      setLoc({
        name: 'current location',
        position,
      });
    },
    error => {
      Alert.alert('cannot get Location');
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000,
    },
  );
};
