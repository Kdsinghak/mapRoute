navigator.geolocation = require('@react-native-community/geolocation');
import React from 'react';
import Home from './src/modules/home';
import StackScreens from './src/routes/stack';

export default function App() {
  return <StackScreens />;
}
