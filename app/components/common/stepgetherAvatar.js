import React from 'react';
import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
const StepgetherAvatar = ({
  avatarType,
  onPress,
  size = 100,
  onEditPress,
  editIcon,
  title,
}) => {
  let initials = title.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  let showEditButton = onEditPress || editIcon ? true : false;
  return avatarType.includes('http') ? (
    <Avatar
      size={size}
      rounded
      source={{
        uri: avatarType,
      }}
      onEditPress={onEditPress}
      showEditButton={showEditButton}
      onPress={onPress}
    />
  ) : (
    <Avatar
      size={size}
      rounded
      title={initials}
      onEditPress={onEditPress}
      showEditButton={showEditButton}
      onPress={onPress}
    />
  );
};
StepgetherAvatar.propTypes = {
  avatarType: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
};
export default StepgetherAvatar;
