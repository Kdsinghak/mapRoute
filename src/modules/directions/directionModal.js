import React from 'react';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {onPlaceSelected} from '../home/utils';
import localImages from '../../utils/localImages';
import {geolocation} from '../../utils/commonFunctions';
import {View, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';

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
    handleModal();
  };

  const setcurrentLocation = () => {
    geolocation(onsucess => {
      setSource(onsucess);
      handleModal();
    });
  };

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal isVisible={isModalVisible} style={{margin: 0}}>
      <View style={styles.modalView}>
        <View style={styles.modalInputView}>
          <TouchableOpacity
            style={styles.modalBackButton}
            onPress={() => handleModal(setModalVisible, isModalVisible)}>
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
          <CustomButton
            text={'Your Location'}
            width={'45%'}
            bgColor={'aqua'}
            tintColor={'blue'}
            image={localImages.gps}
            marginRight={10}
            onPressButton={setcurrentLocation}
          />

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
