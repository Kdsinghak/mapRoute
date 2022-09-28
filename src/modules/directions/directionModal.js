import React from 'react';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {onPlaceSelected} from '../home/utils';
import localImages from '../../utils/localImages';
import {localStrings} from '../../utils/localStrings';
import {geolocation} from '../../utils/commonFunctions';
import {View, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../../components/customButton/customButton';
import {InputAutocomplete} from '../../components/InputAutoComplete/InputAutocomplete';
export default function DirectionModal({
  flag,
  mapRef,
  setSource,
  setDestination,
  isModalVisible,
  setModalVisible,
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

  const chooseOnMap = () => {};
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
            onPlaceSelected={onSelect}
            placeholder={localStrings.placeholder}
          />
        </View>
        <View style={styles.modalLocationButtonView}>
          <CustomButton
            text={localStrings.currentLocation}
            width={'45%'}
            bgColor={'aqua'}
            marginRight={10}
            tintColor={'blue'}
            image={localImages.gps}
            onPressButton={setcurrentLocation}
          />

          <CustomButton
            width={'45%'}
            bgColor={'aqua'}
            marginRight={10}
            onPressButton={chooseOnMap}
            text={localStrings.chooseMap}
            image={localImages.locationpin2}
          />
        </View>
      </View>
    </Modal>
  );
}
