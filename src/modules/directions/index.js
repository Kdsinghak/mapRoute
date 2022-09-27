import {styles} from './styles';
import {traceRoute} from '../home/utils';
import React, {useState, useRef} from 'react';
import localImages from '../../utils/localImages';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import DirectionModal from './directionModal';
import CustomButton from '../../components/customButton/customButton';

export default function Directions({route}) {
  const {Source, Destination, mapRef} = route.params;
  const animate = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [source, setSource] = useState({
    name: 'enter Source location',
    position: '',
  });
  const [destination, setDestination] = useState({
    name: 'enter destination location',
    position: '',
  });

  const [flag, setflag] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const getRoute = () => {
    traceRoute(mapRef, source.position, animate, destination.position);
    Source(source.position), Destination(destination.position);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backIconStyle}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={localImages.back} style={styles.backicon} />
      </TouchableOpacity>
      <View style={styles.inputViewContainer}>
        <Image style={styles.leftinputIcon} source={localImages.locationPin} />

        <TouchableOpacity
          style={styles.inputView1}
          onPress={() => {
            setModalVisible(!isModalVisible);
            setflag(1);
          }}>
          <Text numberOfLines={1} style={styles.textModalView}>
            {source.name}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputViewContainer}>
        <Image style={styles.leftinputIcon} source={localImages.locationPin} />

        <TouchableOpacity
          style={styles.inputView2}
          onPress={() => {
            setModalVisible(!isModalVisible);
            setflag(2);
          }}>
          <Text numberOfLines={1} style={styles.textModalView}>
            {destination.name}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={getRoute} style={styles.buttonStyle}>
        <Text style={styles.buttonTextView}>Show Route</Text>
      </TouchableOpacity> */}
      <CustomButton
        text={'Show Route'}
        onPressButton={getRoute}
        width={'45%'}
        marginTop={30}
        bgColor={'aqua'}
      />
      <DirectionModal
        destination={destination}
        setDestination={setDestination}
        source={source}
        setSource={setSource}
        flag={flag}
        setflag={setflag}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        mapRef={mapRef}
      />
    </SafeAreaView>
  );
}
