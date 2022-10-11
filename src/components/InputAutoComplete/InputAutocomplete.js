/* eslint-disable react/react-in-jsx-scope */
import {useRef} from 'react';
import renderLeftButton from './renderLeftButton';
import {GOOGLE_MAPS_APIKEY} from '../../../env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export function InputAutocomplete({
  icon,
  Styles,
  placeholder,
  onPlaceSelected,
  MAPkey,
}) {
  const ref = useRef();
  const apikey = MAPkey.MAPkey;
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
        key: apikey,
        language: 'en',
      }}
      debounce={500}
      renderLeftButton={() => renderLeftButton(icon)}
    />
  );
}
