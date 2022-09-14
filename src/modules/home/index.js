import {View, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default function App() {
  const [loc, setLoc] = useState({
    latitude: 28.6129167,
    longitude: 77.2273157,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      console.log(pos);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        mapType="hybrid"
        maxZoomLevel={20}
        minZoomLevel={5}
        zoomTapEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor={'black'}
        loadingBackgroundColor={'black'}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsTraffic={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={loc}></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
