import React from 'react';
import {
  SFAutocompleteLocation,
  SFAutocompleteLocationPlaceDetails,
  SFAutocompleteLocationResult,
  SFGeocoderAddressComponent
} from 'sfui';
import { LocationAddressType } from '../../Models';

const getAddressComponents = (
  details: SFAutocompleteLocationPlaceDetails,
  fullText: string
): LocationAddressType => {
  let addressComponentFull = {
    street_number: '',
    route: '',
    postal_code: '',
    country: '',
    locality: '',
    administrative_1: '',
    administrative_2: ''
  };

  details.addressComponents?.forEach(
    (component: SFGeocoderAddressComponent) => {
      switch (component.types[0]) {
        case 'street_number':
          addressComponentFull = {
            ...addressComponentFull,
            street_number: component.long_name
          };
          break;
        case 'route':
          addressComponentFull = {
            ...addressComponentFull,
            route: component.long_name
          };
          break;
        case 'locality':
          addressComponentFull = {
            ...addressComponentFull,
            locality: component.long_name
          };
          break;
        case 'administrative_area_level_2':
          addressComponentFull = {
            ...addressComponentFull,
            administrative_2: component.long_name
          };
          break;
        case 'administrative_area_level_1':
          addressComponentFull = {
            ...addressComponentFull,
            administrative_1: component.short_name
          };
          break;
        case 'postal_code':
          addressComponentFull = {
            ...addressComponentFull,
            postal_code: component.long_name
          };
          break;
        case 'country':
          addressComponentFull = {
            ...addressComponentFull,
            country: component.long_name
          };
          break;
        default:
          break;
      }
    }
  );

  let main: string = addressComponentFull.route;
  if (addressComponentFull.street_number.length > 0) {
    main = `${addressComponentFull.street_number} ${main}`;
  }

  let address: LocationAddressType = {
    full: fullText,
    main,
    city: addressComponentFull.locality,
    state_id: addressComponentFull.administrative_1,
    zip: addressComponentFull.postal_code
  };

  if (details && details.geometry && details.geometry.location) {
    address.coords = {
      latitude: details.geometry.location.lat(),
      longitude: details.geometry.location.lng()
    };
  }

  return address;
};

export interface LocationFieldProps {
  label: string;
  value: LocationAddressType | undefined;
  currentLocation: boolean;
  onChange: (value: LocationAddressType) => void;
}

export const LocationField = ({
  label,
  value,
  currentLocation,
  ...props
}: LocationFieldProps): React.ReactElement<LocationFieldProps> => {
  const onChange = (newValue: SFAutocompleteLocationResult) => {
    if (newValue.placeDetails) {
      props.onChange(
        getAddressComponents(newValue.placeDetails, newValue.text)
      );
    } else {
      props.onChange({
        full: newValue.text
      });
    }
  };

  return (
    <SFAutocompleteLocation
      currentLocation={currentLocation}
      label={label}
      value={{ text: value ? value.full : '' }}
      onChange={onChange}
    />
  );
};
