import React from 'react';
import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
const StepgetherAvatar = ({avatarType, onPress, size = 100}) => {
  if (avatarType.includes('http')) {
    return (
      <Avatar
        size={size}
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
      />
    );
  } else {
    let initials = avatarType.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return <Avatar size={size} rounded title={initials} />;
  }
};
StepgetherAvatar.propTypes = {
  avatarType: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
};
export default StepgetherAvatar;
