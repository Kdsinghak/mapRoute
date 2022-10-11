import * as React from 'react';
import Home from '../../modules/home/index';
import Directions from '../../modules/directions';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GOOGLE_MAPS_APIKEY} from '../../../env';
const Stack = createNativeStackNavigator();

export default function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{MAPkey: GOOGLE_MAPS_APIKEY}}
        />
        <Stack.Screen
          name="Directions"
          component={Directions}
          MAPkey={GOOGLE_MAPS_APIKEY}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
