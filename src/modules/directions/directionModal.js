import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {onPlaceSelected} from '../home/utils';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
import localImages from '../../utils/localImages';

import {geolocation} from '../../utils/commonFunctions';
import CustomButton from '../../components/customButton/customButton';

export default function DirectionModal({
  setDestination,
  setSource,
  flag,
  isModalVisible,
  setModalVisible,
  mapRef,
}) {
  const onSelect = details => {
    onPlaceSelected(details, flag, setSource, setDestination, mapRef);
    setModalVisible(!isModalVisible);
  };
  return (
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <CustomButton
            text={'Your Location'}
            width={'45%'}
            bgColor={'aqua'}
            tintColor={'blue'}
            image={localImages.gps}
            marginRight={10}
            onPressButton={() => {
              geolocation(onsucess => {
                setSource(onsucess);
                setModalVisible(!isModalVisible);
              });
            }}
          />
          {/* <TouchableOpacity style={styles.locationButtonStyles}>
            <Image
              source={localImages.locationpin2}
              style={styles.locationButtonIcongpspin}
            />
            <Text style={styles.buttonText}>choose on map</Text>
          </TouchableOpacity> */}
          <CustomButton
            text={'Choose on Map'}
            width={'45%'}
            bgColor={'aqua'}
            image={localImages.locationpin2}
            marginRight={10}
          />
        </View>
      </View>
    </Modal>
  );
}
