import {styles} from './styles';
import React, {useState} from 'react';
import {traceRoute} from '../home/utils';
import DirectionModal from './directionModal';
import localImages from '../../utils/localImages';
import {localStrings} from '../../utils/localStrings';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/customButton/customButton';
import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';

export default function Directions({route}) {
  const {Source, Destination, mapRef} = route.params;

  const navigation = useNavigation();
  const [source, setSource] = useState({
    name: localStrings.enterSource,
    position: '',
  });
  const [destination, setDestination] = useState({
    name: localStrings.enterDestination,
    position: '',
  });

  const [flag, setflag] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const getRoute = () => {
    traceRoute(mapRef, source.position, destination.position);
    Source(source.position), Destination(destination.position);
    navigation.goBack();
  };

  const handleNavigation = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backIconStyle} onPress={handleNavigation}>
        <Image source={localImages.back} style={styles.backicon} />
      </TouchableOpacity>
      <View style={styles.inputViewContainer}>
        <Image style={styles.leftinputIcon} source={localImages.circle} />

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

      <CustomButton
        width={'45%'}
        marginTop={30}
        bgColor={'aqua'}
        text={localStrings.showRoute}
        onPressButton={getRoute}
      />
      <DirectionModal
        flag={flag}
        source={source}
        mapRef={mapRef}
        setflag={setflag}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}
