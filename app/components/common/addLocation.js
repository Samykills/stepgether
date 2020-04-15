import React from 'react';
import RNGooglePlaces from 'react-native-google-places';
import {Button} from 'react-native-elements';
import COLORS from '../../theme/colors';
import PropTypes from 'prop-types';

const AddLocation = ({onPress}) => {
  const onPressLocation = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        onPress(place);
      })
      .catch(error => console.log(error.message));
  };
  return (
    <Button
      title="Add Location"
      type="clear"
      raised={false}
      titleStyle={{color: COLORS.BLACK}}
      buttonStyle={{borderColor: COLORS.BLACK}}
      icon={{
        name: 'location-pin',
        size: 20,
        color: COLORS.BLACK,
        type: 'entypo',
      }}
      onPress={onPressLocation}
    />
  );
};
AddLocation.proptypes = {
  onPress: PropTypes.func,
};

export default AddLocation;
