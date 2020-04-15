import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import COLORS from '../../theme/colors';
import PropTypes from 'prop-types';

const Chip = ({value, onPress}) => {
  const onPressChip = () => {
    onPress(value);
  };
  return (
    <TouchableHighlight
      style={{
        padding: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BLUE,
      }}
      onPress={onPressChip}>
      <Text style={{color: COLORS.WHITE, fontWeight: 'bold'}}>{value}</Text>
    </TouchableHighlight>
  );
};

Chip.proptypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
};
export default Chip;
