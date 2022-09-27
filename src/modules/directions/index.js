import {styles} from './styles';
import Modal from 'react-native-modal';
import {traceRoute} from '../home/utils';
import {onPlaceSelected} from '../home/utils';
import React, {useState, useRef} from 'react';
import localImages from '../../utils/localImages';
import {useNavigation} from '@react-navigation/native';
import {geolocation} from '../../utils/commonFunctions';
import {Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';

export default function Directions({route}) {
  const {Source, Destination, mapRef} = route.params;

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

  const onSelect = details => {
    onPlaceSelected(details, flag, setSource, setDestination, mapRef);
    setModalVisible(!isModalVisible);
  };

  const getRoute = () => {
    traceRoute(mapRef, source.position, destination.position);
    Source(source.position), Destination(destination.position);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputViewContainer1}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={localImages.back} style={styles.backicon} />
        </TouchableOpacity>
        <Image style={styles.leftinputIcon} source={localImages.locationPin} />

        <TouchableOpacity
          style={styles.inputView1}
          onPress={() => {
            setModalVisible(!isModalVisible);
            setflag(1);
          }}>
          <Text numberOfLines={1}>{source.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputViewContainer2}>
        <Image style={styles.leftinputIcon} source={localImages.locationPin} />

        <TouchableOpacity
          style={styles.inputView2}
          onPress={() => {
            setModalVisible(!isModalVisible);
            setflag(2);
          }}>
          <Text numberOfLines={1}>{destination.name}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={getRoute} style={styles.buttonStyle}>
        <Text>show Route</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.modalInputView}>
            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}>
              <Image
                source={localImages.back}
                style={styles.modalBackButtonIcon}
              />
            </TouchableOpacity>
            <InputAutocomplete
              Styles={styles.input}
              placeholder="search here"
              onPlaceSelected={onSelect}
            />
          </View>
          <View style={styles.modalLocationButtonView}>
            <TouchableOpacity
              onPress={() => {
                geolocation(onsucess => {
                  setSource(onsucess);
                  setModalVisible(!isModalVisible);
                });
              }}
              style={styles.locationButtonStyles}>
              <Image
                source={localImages.gps}
                style={styles.locationButtonIcongps}
              />
              <Text style={styles.buttonText}>Your location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButtonStyles}>
              <Image
                source={localImages.locationpin2}
                style={styles.locationButtonIcongpspin}
              />
              <Text style={styles.buttonText}>choose on map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
