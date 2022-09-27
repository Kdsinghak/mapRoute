import React from 'react';
import {styles} from './styles';
import {View, Animated, Text} from 'react-native';

export default function AnimationView({distance, duration, animate}) {
  return (
    <Animated.View
      style={{
        height: 100,
        width: '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
        transform: [
          {
            translateY: animate.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
      }}>
      <View style={styles.distanceView}>
        <Text style={styles.TimeAndDistance}>{`${Math.ceil(
          duration,
        )}min (${distance.toFixed(2)})km`}</Text>
        <Text style={styles.quote}>
          {'Fastest route now due to traffic conditions'}
        </Text>
      </View>
    </Animated.View>
  );
}
