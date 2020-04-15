import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import COLORS from '../../theme/colors';
import PropTypes from 'prop-types';
const Chip = ({value, onPress}) => {
  const onPressChip = () => {
    onPress(value);
  };
  return (
    <TouchableHighlight style={[styles.touchContainer]} onPress={onPressChip}>
      <Text style={[styles.textStyle]}>{value}</Text>
    </TouchableHighlight>
  );
};

Chip.proptypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  touchContainer: {
    padding: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE,
  },
  textStyle: {color: COLORS.WHITE, fontWeight: 'bold'},
});
export default Chip;
