import React from 'react';
import {styles} from './styles';
import {hideDistance} from './utils';
import localImages from '../../utils/localImages';
import {localStrings} from '../../utils/localStrings';
import {View, Animated, Text, Image, TouchableOpacity} from 'react-native';
export default function AnimationView({distance, duration, animate}) {
  const HideDistance = () => {
    hideDistance(animate);
  };
  return (
    <Animated.View
      style={[
        styles.AnimationView,
        {
          transform: [
            {
              translateY: animate.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        },
      ]}>
      <TouchableOpacity style={styles.closeButton} onPress={HideDistance}>
        <Image source={localImages.close} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.distanceView}>
        <Text style={styles.TimeAndDistance}>{`${Math.ceil(duration)}${
          localStrings.Min
        } (${distance.toFixed(2)})${localStrings.KM}`}</Text>
        <Text style={styles.quote}>{localStrings.DistanceQuote}</Text>
      </View>
    </Animated.View>
  );
}
