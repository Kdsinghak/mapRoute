import {LogBox} from 'react-native';
import React from 'react';
import StackScreens from './src/routes/stack';

LogBox.ignoreAllLogs();
export default function App() {
  return <StackScreens />;
}
