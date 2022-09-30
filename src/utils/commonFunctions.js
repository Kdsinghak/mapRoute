import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  RESULTS,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {Dimensions, Platform, Linking} from 'react-native';

export const LATITUDE_DELTA = 0.02;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const geolocation = setLoc => {
  if (Platform.OS === 'ios') {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              'Location permission',
              'Your device not support gps services',
            );
            break;
          case RESULTS.DENIED:
            if (result === RESULTS.DENIED) {
              Alert.alert(
                'Location permission',
                'Allow the app to access location to ' +
                  'see location-based services.',
              );
              requestMultiple([
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                PERMISSIONS.IOS.LOCATION_ALWAYS,
                1,
              ])
                .then(res => {
                  console.log('we456789oijhgfds', res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            if (result === RESULTS.GRANTED) {
              console.log('w345678iop;.l,kjhgfdsa', result);
              getOneTimeLocation(setLoc);
              subscribeLocationLocation(setLoc);
            }
            break;
          case RESULTS.BLOCKED:
            if (result === RESULTS.BLOCKED) {
              console.log('3456789oijuhgfdsaaSDFGHJK', result);
              Alert.alert(
                'Location permission',
                'Location permission is blocked in the device ' +
                  'settings. Allow the app to access location to ' +
                  'see location-based services.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      Linking.openSettings();
                    },
                  },
                ],
              );
              return;
            }
            break;
          default:
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              'Location permission',
              'Your device not support gps services',
            );
            break;
          case RESULTS.DENIED:
            if (result === RESULTS.DENIED) {
              Alert.alert(
                'Location permission',
                'Allow the app to access location to ' +
                  'see location-based services.',
              );
              requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, 1])
                .then(res => {
                  console.log('we456789oijhgfds', res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            if (result === RESULTS.GRANTED) {
              getOneTimeLocation(setLoc);
              subscribeLocationLocation(setLoc);
            }
            break;
          case RESULTS.BLOCKED:
            if (result === RESULTS.BLOCKED) {
              Alert.alert(
                'Location permission',
                'Location permission is blocked in the device ' +
                  'settings. Allow the app to access location to ' +
                  'see location-based services.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      Linking.openSettings();
                    },
                  },
                ],
              );
              return;
            }
            break;
          default:
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
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
