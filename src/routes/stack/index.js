import * as React from 'react';
import Home from '../../modules/home/index';
import Directions from '../../modules/directions';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Directions" component={Directions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
