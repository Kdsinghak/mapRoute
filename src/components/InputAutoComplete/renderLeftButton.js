import React from 'react';
import {View, Image} from 'react-native';
import {styles} from '../../modules/home/styles';

const renderLeftButton = icon => {
  return (
    <View style={styles.renderLeftButtonView}>
      <Image source={icon} style={styles.AutocomleteIcon} />
    </View>
  );
};

export default renderLeftButton;
