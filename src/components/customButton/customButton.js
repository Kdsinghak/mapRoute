import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import React from 'react';

function CustomButton(props) {
  const {
    textColor,
    bgColor,
    text,
    onPressButton,
    disable = false,
    borderColor,
    width,
    marginTop,
    image,
    marginRight,
    tintColor,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disable ? props?.disableColor : bgColor,
          borderColor: borderColor,
        },
        {width: width},
        {marginTop: marginTop},
      ]}
      activeOpacity={0.8}
      onPress={() => onPressButton()}
      disabled={disable}>
      {image ? (
        <View style={styles.imageView}>
          <Image
            source={image}
            style={{...styles.imageStyle, tintColor: tintColor}}
          />
        </View>
      ) : null}
      <Text
        style={{
          ...styles.buttonText,
          color: textColor,
          marginRight: marginRight,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default React.memo(CustomButton);
const styles = StyleSheet.create({
  button: {
    height: 42,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
  },
  imageView: {height: 22, width: 22, marginRight: 20},
  imageStyle: {height: '100%', width: '100%'},
});
