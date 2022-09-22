import {useRef} from 'react';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {View, Image} from 'react-native';
import {styles} from '../../modules/home/styles';
import {GOOGLE_MAPS_APIKEY} from '../../modules/home/utils';

const renderLeftButton = icon => {
  return (
    <View
      style={{
        marginLeft: 10,
      }}>
      <Image source={icon} style={styles.AutocomleteIcon} />
    </View>
  );
};

export function InputAutocomplete({
  icon,
  Styles,
  placeholder,
  onPlaceSelected,
  currentLocation,
  currentLocationLabel,
}: InputAutocompleteProps) {
  const ref = useRef();

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      styles={{
        textInput: Styles,
      }}
      placeholder={placeholder || ''}
      fetchDetails
      onPress={(data, details = null) => {
        onPlaceSelected(details);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      debounce={500}
      currentLocation={currentLocation}
      // currentLocationLabel={currentLocationLabel}
      renderLeftButton={() => renderLeftButton(icon)}
    />
  );
}
