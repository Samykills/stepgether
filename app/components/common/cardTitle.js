import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
const CardTitle = ({name, photoUrl, postedOn}) => {
  return photoUrl.includes('http') ? (
    <ListItem
      leftAvatar={{source: {uri: photoUrl}}}
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
  photoUrl: PropTypes.string,
  postedOn: PropTypes.string,
};
export default CardTitle;
