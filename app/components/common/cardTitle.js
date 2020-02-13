import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
const CardTitle = ({name, profileImageUrl, postedOn}) => {
  return profileImageUrl.includes('http') ? (
    <ListItem
      leftAvatar={{source: {uri: profileImageUrl}}}
      title={name}
      subtitle={postedOn}
      bottomDivider
    />
  ) : (
    <ListItem
      leftAvatar={{title: {name}}}
      title={name}
      subtitle={postedOn}
      bottomDivider
    />
  );
};
CardTitle.proptypes = {
  name: PropTypes.string,
  profileImageUrl: PropTypes.string,
  postedOn: PropTypes.string,
};
export default CardTitle;
