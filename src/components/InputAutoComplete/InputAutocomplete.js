import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../../modules/home/utils';
import {styles} from '../../modules/home/styles';
import {View, Image} from 'react-native';
export function InputAutocomplete({
  icon,
  Styles,
  placeholder,
  onPlaceSelected,
  currentLocation,
  currentLocationLabel,
}: InputAutocompleteProps) {
  return (
    <View style={styles.AutocompleteView}>
      <GooglePlacesAutocomplete
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
        currentLocation={currentLocation}
        currentLocationLabel={currentLocationLabel}
      />
      <Image source={icon} style={styles.AutocomleteIcon} />
    </View>
  );
}
