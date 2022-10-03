import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import localImages from '../../utils/localImages';
import maps from './mapData';
import Modal from 'react-native-modal';
import {localStrings} from '../../utils/localStrings';

export default function MapSelectModal({
  isModalVisible,
  setModalVisible,
  maptype,
}) {
  const [selectmap, setSelectMap] = useState(maps);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onItemPress = item => {
    let i = maps.findIndex(ele => ele === item);
    maptype(item.title);
    onFocusedChange(i);
  };

  const onFocusedChange = i => {
    selectmap.map((item, index) => {
      if (i === index) {
        item.isFocused = true;
      } else {
        item.isFocused = false;
      }
    });
    setSelectMap([...selectmap]);
    setModalVisible(!isModalVisible);
  };

  const onRender = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.mapSelectionView}
        onPress={() => onItemPress(item)}>
        <Image
          source={item?.image}
          style={
            item?.isFocused ? styles.mapImageStyle : styles.mapFocusedStyle
          }
        />
        <Text style={styles.mapTextStyle}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      hasBackdrop={true}
      style={styles.modalView}>
      <View style={styles.modalMainView}>
        <View style={styles.mapTextView}>
          <Text style={styles.mapTypeText}>{localStrings.mapType}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={localImages.close} style={styles.closeImageStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalFlatlistView}>
          <FlatList
            data={selectmap}
            renderItem={onRender}
            horizontal
            bounces={false}
          />
        </View>
      </View>
    </Modal>
  );
}
