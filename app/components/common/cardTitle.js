import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {dateFormatPost} from '../../util/dateUtil';

const CardTitle = ({name, photoUrl, postedOn}) => {
  return photoUrl.includes('http') ? (
    <ListItem
      leftAvatar={{source: {uri: photoUrl}}}
      title={name}
      subtitle={dateFormatPost(postedOn)}
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
  postedOn: PropTypes.object,
};
export default CardTitle;
