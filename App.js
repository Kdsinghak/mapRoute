navigator.geolocation = require('@react-native-community/geolocation');
import {LogBox, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import StackScreens from './src/routes/stack';

LogBox.ignoreAllLogs();
export default function App() {
  return <StackScreens />;
}
